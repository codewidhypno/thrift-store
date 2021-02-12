const mongoose = require('mongoose')
const bcrypt  = require('bcrypt')

const userSchema =  mongoose.Schema({
    firstname: {
        type:String,
        required:true
    },
    lastname :{
        type:String,
        require:true
    },
    mobile : { type:String },
    email :{
        type:String,
        required:true,
             
    },
    hash_password : {
        type:String,
        required:true
    },
   
    isAdmin : {
        type:Boolean,        
        default: true
    }
    


},{
    timestamps:true
})

userSchema.virtual('password')
.set(function(password) {
    this.hash_password = bcrypt.hashSync(password,10)
});

userSchema.virtual('fullName')
.get(function(){
    return `${this.firstname} ${this.lastname}`
})

userSchema.methods = {
    authenticate :  function(password) {
        return bcrypt.compareSync(password,this.hash_password)
    },
};
module.exports = mongoose.model('User',userSchema)