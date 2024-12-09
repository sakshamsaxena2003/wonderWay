const express = require("express");
const { route } = require("./listing");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirctUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSignUpForm)
    .post(wrapAsync(userController.signUp));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
        saveRedirctUrl,
        passport.authenticate("local", { 
            failureRedirect: '/login', 
            failureFlash: true 
        }), 
        userController.login
    );

router.get("/logout", userController.logOut);

module.exports = router;
