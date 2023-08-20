const express = require('express');
const mongoose = require("mongoose");
var cors = require("cors");
const registerRoute = require("./routes/userRoutes")
const messageRoute = require("./routes/messageRoute");
const socket = require("socket.io")
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json({limit: "10mb", extended: true}))
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("db connnect succesfuly")
}).catch((err)=>{
    console.log("unable to connect" + err.message)
})

app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
app.use("/api/auth",registerRoute)
app.use("/api/message",messageRoute)

const server =  app.listen(process.env.PORT,()=>{
    console.log(`sever is runing on port ${process.env.PORT}`)
})

const io = socket(server,{
    cors:{
        origin:process.env.CLIENT_URL||"http://localhost:3000",
        credentials:true
    }
})

global.onlineUser = new Map();



function removerOffliner(idToRemove,fromArry){
   
const ind = fromArry.indexOf( idToRemove )

if (ind > -1) {
    fromArry.splice(ind, 1);
  }else{
   
  }
  return fromArry;
}

function showOnlineUsers(socket,arryToShow,onlineUser) {
    const arry = arryToShow.map((userrId)=>{      
           return {online:true,userId:userrId} 
                })
                onlineUser&&socket.broadcast.emit("showOnline",arry)&&socket.emit("showOnline",arry)
        
}

io.on("connect",async (socket)=>{

    global.chatSocket = socket;
    socket.on("addUser",(userId)=>{
        onlineUser.set(userId,socket.id)
        
  var dailerId;

        try {
            const onlinePeople = Object.fromEntries(onlineUser)
            const onlinePeopleIds = Object.keys(onlinePeople)
           
            showOnlineUsers(socket,onlinePeopleIds,onlineUser)     
        socket.on("disconnect",()=>{
      
     const newOnlines =  removerOffliner(userId,onlinePeopleIds)

     showOnlineUsers(socket,newOnlines,onlineUser)
     onlineUser.delete(userId)
 
        })
        } catch (error) {
            console.log(error)
        }
   
    
    })
    
    try {
        socket.on("sendMsg",async (data)=>{
            try {
                
                onlineUser.set(data.from,socket.id)
         
                const sendUserSocket = await onlineUser.get(data.to)
                
                if(sendUserSocket){
                    socket.to(sendUserSocket).emit("msgRecieve",data)
               
                } 
            } catch (error) {
                console.log(error)
            }
            
        })
    } catch (error) {
        console.log(error)
    }

    try {
        socket.on("dialing:call",async ({reciver_id,reciverName,daillerName,dailler_id})=>{
            dailerId = dailler_id
           
            const onlinePeople = Object.fromEntries(onlineUser)
            const onlinePeopleIds = Object.keys(onlinePeople)
        
            if(onlinePeopleIds.indexOf(reciver_id) !== -1) { 
                const  reciverSocketId =  await onlineUser.get(reciver_id)
                const  daillerSocketId =  await onlineUser.get(dailler_id)
  
               await socket.emit("connection:check",{ status:"calling...",reciver_id:reciver_id,  reciverName:reciverName,daillerName:daillerName,dailler_id:dailler_id,})
               try {
                await socket.on("outgoing:call",(data)=>{
                console.log(data);
                    socket.to(reciverSocketId).emit("incoming:call",{data:data,daillerName:daillerName})                   
                })
                await socket.on("peer:nego:needed", async(data)=>{
                   
                   await socket.to(reciverSocketId).emit("peer:incoming:nego",{data:data,daillerSocketId:daillerSocketId})
                   console.log("peer:nego:needed is working");
                });
              
               } catch (error) {
                console.log(error);
               }
           }   
       else   {  
        
      await  socket.emit("connection:check",{status:"OFFLINE"}) }  

        }
        )
     } catch (error) {
        console.log(error)
       }
  try {
    await  socket.on("call:rejected",async(daillerId)=>{
const  daillerSocketId =  await onlineUser.get(dailerId)

      socket.to(daillerSocketId).emit("reject:show",{status:'REJECTED'})
      
    })
  } catch (error) {
    console.log(error);
  }   
try {
    socket.on("answer:accpected", async(data)=>{
   
        const  daillerSocketId =  await onlineUser.get(dailerId)
        socket.to(daillerSocketId).emit("answer:accpected:emiter",data)
        
    })
    //nego:incoming:accepted
    
} catch (error) {
    console.log(error);
}
try {
    socket.on("nego:incoming:accepted",async(data)=>{
      
await socket.to(data.to).emit("nego:incoming:final",{data})
console.log("went succense fully");
    })
} catch (error) {
    
}

})
 
