import express from 'express';
import { body, validationResult } from 'express-validator';
import { Users } from './Models/Models.js';
import brcypt from 'bcrypt';

const router = express.Router();

router.post("/newUser",
body("email").isEmail(),
body("username", "username too small").isLength({min : 4}),
body("password", "password too small").isLength({min : 8})
,async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const response = {...errors.array()[0], status:false};
        return res.send(response);
    }
    else{

        try {
            const emailCheck = await Users.findOne({email: req.body.email});
        if(emailCheck){
            return res.send({msg : "email already used", status : false});
        }
        const usernameCheck = await Users.findOne({username : req.body.username});
        if(usernameCheck){
            return res.send({msg : "username already taken", status: false});
        }
        const hashedPassword = await brcypt.hash(req.body.password, 10);
        const user = await Users.create({
            username : req.body.username,
            password : hashedPassword,
            email : req.body.email
        });
        delete user.password;
        return res.send({status : true, user});
        } catch (error) {
            res.send({status: false, msg : error});
        }
    }
})


router.post("/login",
body("username", "Incorrect Username").isLength({min : 4}),
body("password", "Incorrect Password").isLength({min : 8})
,async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const response = {...errors.array()[0], status:false};
        return res.send(response);
    }
    try {
       const userCheck = await Users.findOne({username : req.body.username});
       if(!userCheck){
        return res.send({msg : "User not registered", status : false});
       } 
       else{
        const passwordCheck = await brcypt.compare(req.body.password, userCheck.password);
        if(passwordCheck){
            return res.send({status : true, user : userCheck});
        }
        else{
           return res.send({status: false, msg : "Incorrect Password"});
        }
       }
    } catch (error) {
         res.send({status: false, msg : error});
    }
});


router.post("/selectAvatar/:id", async (req, res)=>{
   try {
    const user = await Users.findByIdAndUpdate( req.params.id, {avatar : req.body.avatar, isAvatarSet : true}, {new: true });
    return res.json(user);
   } catch (error) {
    return res.send({status : false, isAvatarSet : false});
   }
})


router.get("/allUser/:id", async(req,res)=>{
    try {
        const allUsers = await Users.find({_id : {$ne: req.params.id}}).select(["username", "avatar", "_id", "email"]);
        return res.send(allUsers);
    } catch (error) {
        return res.send({status : false, msg : error});
    }
})
export default router;