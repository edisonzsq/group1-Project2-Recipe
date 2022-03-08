// call controller for respective routes

// Create a new set of routes for protected
const express = require("express");
const router = express.Router(); // create route
const cors = require('cors'); // middleware
const user = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Import User controller
const UserController = require("../controllers/userController");
const { application } = require("express");
const { json } = require("body-parser");
// Instantiate a new class instance
const userController = new UserController();

router.post('/login', async(req, res) => {
  const { email, password } = req.body; // Get email & password from body parser.
  const userEmail = await user        // Checking email with DB.
    .findOne({ where: { email } })
    .catch((err) => {
      console.log('Error: ', err);
    });

  if(!userEmail)                          // If email doesn't match DB.
    return res.json( {message: 'Email / Password does not match!'});

  if(userEmail.password !== password)     // If password doesn't match DB.
    return res.json({message: 'Email / Password does not match!' });

    const jwtToken = jwt.sign({id: userEmail.id, email: userEmail.email, expiresIn: '1h'}, process.env.JWT_KEY);

    res.json({ message: "You are Logged In", token: jwtToken });
});


// router
//   .route("/login")
//   .get((request, response) => {
//     response.send("You have called a login route!");
//     // if (request.isAuthenticated()) {
//     //   response.redirect("/");
//     // } else {
//     //   response.redirect("/login");
//     // }
//   })
//   .post(userController.login);

// router
//   .route("/logout")
//   .get((request, response) => {
//     response.send("You have called a logout route!");
//   })
//   .post(userController.logout);

// router
//   .route("/register")
//   .get((request, response) => {
//     response.send("You have called a register route!");
//   })
//   .post(userController.register);

// router.route("/").get((request, response) => {
//   response.send("You have called the root route!");
  // if (request.isAuthenticated()) {
  //   response.send("You have called the root route!");
  // } else {
  //   response.redirect("/login");
  // }
// });

// router.put("/protected/recipe", recipeController.update);
// router.delete("/protected/driver/:driverId", recipeController.deleteDriver);

module.exports = router;
