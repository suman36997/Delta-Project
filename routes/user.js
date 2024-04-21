const express=require('express');
const router=express.Router();
const wrapAsync = require('../utils/wrapAsync');
const passport=require('passport');
const{saveRedirectUrl}=require('../middleware.js');
const userController=require('../controllers/user.js');

// renderSignUp route and registerUser route
router
.route('/signup')
.get(userController.renderSignupForm)
.post(wrapAsync(userController.registerUser))

// renderLoginForm route and loginUser route
router
.route('/login')
.get(userController.renderLoginForm)
.post(saveRedirectUrl,
    passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),
    userController.loginUser)

// logout
router.get('/logout',userController.logoutUser);

module.exports=router;