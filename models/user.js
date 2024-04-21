const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose=require('passport-local-mongoose');

// no need to mention username and password in the userSchema
// because passport local mongoose automatically store username 
// and password in the userSchema to implement it you have to use
// plugin 
const userSchema= new Schema({
    email:{
        type:String,
        required:true,
    }
});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',userSchema);