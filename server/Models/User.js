const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [ true , 'Enter username'],
        unique : true
    },
    email : {
        type : String,
        required : [ true , 'Enter username'],
        unique : true
    },
    password : {
        type : String,
        required : [ true , 'Enter username']
    }

});

userSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next();
    try {
        const salt= await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password,salt);
    next()
    } catch (error) {
        console.error(error);
    }
    
});

userSchema.methods.comparePassword= async function (password) {
    return await bcrypt.compare(password , this.password);
}

module.exports= mongoose.model('User' , userSchema);