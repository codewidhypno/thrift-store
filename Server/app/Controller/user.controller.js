const User = require('../Models/user.model')
const Response = require('../Helper/response')
const jwt       = require('jsonwebtoken') 
const {JWT_KEY}     = require('../Helper/token')

exports.signup = (req, res) => {
    try {

        const { firstname,lastname,mobile,email,password,confirmpassword } = req.body

        User.findOne({email:email})
        .exec((error,user) => {
            if(user) return res.status(400).json({ mmessage:'User already exist'})
        })

        if(password != confirmpassword) {
            return Response.sendFailedmsg(res,'Passwword Mismatch')
        }

        const user = new User({
            firstname:firstname,
            lastname:lastname,
            mobile:mobile,
            email:email,
            password:password,
            isAdmin:false
            
        })

        user.save().then((data) => {
            return Response.sendSuccesmsg(res,'Registration Succesfulll',{data})
        })
        .catch(err => {
            return Response.sendFailedmsg(res,'Something Went Wrong',err.message)
        })
        

    }

    catch(err) {
        return Response.sendFailedmsg(res,'Something Went Wrong',err.message)
    }
} 

exports.signin = (req, res) => {

    User.findOne({email:req.body.email})
    .exec((error,user) =>{
        if(error) return res.status(400).json({})

        if(user) {

            if(user.authenticate(req.body.password)) {
                const token = jwt.sign({_id:user.id},JWT_KEY,{expiresIn:'1h'})

                const  { _id, firstname, lastname, email, isAdmin, fullName} = user
                res.status(200).json({token,user: {
                    _id,firstname,lastname,email, isAdmin, fullName
                }
                })
            }
            else {
                return res.status(400).json({message:'Invalid Password'})
            }
        }
        else {
            res.status(400).json({message:'Something Went Wrong'})
        }
    })
}

exports.profile = (req, res) => {
    res.send('worked')
}