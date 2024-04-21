const User=require('../models/user.js');

module.exports.renderSignupForm=(req,res)=>{
    res.render('users/signup.ejs');
}

module.exports.registerUser=async(req,res)=>{
    try{
        let{username,email,password}=req.body;
        const newUser=new User({email,username});
        const registeredUser=await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash('success','Welcome to Wanderlust');
            res.redirect('/listings');
        })
        
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/signup');
    }

}

module.exports.renderLoginForm=(req,res)=>{
    res.render('users/login.ejs');
}

module.exports.loginUser=async(req,res)=>{
    req.flash('success','Welcome back to Wanderlust! ');
    const redirectUrl=res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
    }
module.exports.logoutUser=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash('success','Logged you out !');
        res.redirect('/listings');
    });
}