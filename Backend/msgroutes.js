import express from 'express';
import mongoose from 'mongoose';
import Messages from './Models/MessageModel.js';

const msgRouter = express.Router();


msgRouter.post("/putMsg", async (req, res)=>{
   try {
    const msgData = await Messages.create({
        text : req.body.text,
        users : req.body.users,
        sender : req.body.sender,
    });

    if(msgData){
        res.send({status: true, msg: "message stored successfully"});
    }
    else{
        res.send({status: false, msg :"process Failed"});
    }
   } catch (error) {
    console.error(error);
   }
});

msgRouter.post("/getAllMsg", async (req, res)=>{
    try {
        const response = await Messages.find({users : {$all :[req.body.from, req.body.to]}}).sort({updatedAt : 1});
        res.json(response);
    } catch (error) {
     console.error(error);   
    }
})


export default msgRouter;