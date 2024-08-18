import express from 'express';
import {createServer} from 'http';
import mongoose from 'mongoose';
import router from './routes.js';
import cors from 'cors';
import msgRouter from './msgroutes.js';
import { Server} from 'socket.io';
const app = express();
const server = createServer(app);

app.get('/', (req, res)=>{
    res.send('server is working');
});

await mongoose.connect("mongodb+srv://Gaurav:xEfXL8h3NI4PHpHJ@practicedb1.rznqqci.mongodb.net/Chat_App?retryWrites=true&w=majority&appName=PracticeDB1")
.then(console.log("connected to the database!"));

app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use('/api/msg', msgRouter);


const io = new Server(server, {
    cors : {
        origin: "http://localhost:5173",
        credentials : true,
    }
});

global.onlineUsers = new Map();

io.on('connection', (socket)=>{
    socket.on("add-user", (user)=>{
        console.log( `${user.name} is online ${socket.id}`);
        onlineUsers.set(user.id, socket.id);
    })

    socket.on("send-msg", (data)=>{
        const receiverUser = onlineUsers.get(data.to);
        if(receiverUser){
            io.to(receiverUser).emit("msg-received", data.msg);
        }
    })
})
server.listen(3000);
