const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const app= express();
const PORT = 3000;
const socket = require("socket.io");
const upload = require("./middlewares/multer")



const cors = require('cors');
const { ActivityInstance } = require("twilio/lib/rest/taskrouter/v1/workspace/activity");
const { ConferenceInstance } = require("twilio/lib/rest/api/v2010/account/conference");


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

require('dotenv').config()


//connect to db
mongoose.connect(
    process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => console.log("Connected to DB")
);

//middleware
app.use(express.json());


app.use("/user/" , require("./routes/loginsRoute"))
app.use("/admin/" , require("./routes/adminRoute"))
app.use("/subscriptionRate" , require("./routes/subscriptionRateRoute"))
app.use("/hospitalType" , require("./routes/hospitalTypeRoute"))
app.use("/hospital" , require("./routes/hospitalRoute"))
app.use("/subscriptionHistory" , require("./routes/subscriptionHistoryRoute"))
app.use("/department" , require("./routes/departmentRoute"))
app.use("/doctor" , require("./routes/doctorRoute"))
app.use("/workDay" , require("./routes/work_day_for_officeRoute"))
app.use("/search" , require("./routes/searchRoute"))
app.use("/work_day_for_office_timing" , require("./routes/workDayForOfficeTimingRoute"))
app.use("/patient" , require("./routes/patientRoute"))
app.use("/hospitalRating" , require("./routes/hospitalRatingRoute"))
app.use("/doctorRating" , require("./routes/doctorRatingRoute"))
app.use("/forgetPassword" , require("./routes/userForgetRoute"))
app.use("/notification" , require("./routes/notificationRoute"))
app.use("/appointmentHistory" , require("./routes/appointmentHistoryRoute"))
app.use("/appointment" , require("./routes/appointmentRoute"))
app.use("/otherPatientDetails" , require("./routes/other_patient_detailRoute"))
app.use("/privacyPolicy" , require("./routes/privacyPolicyRoute"))


app.use("/chat", require("./routes/ChatRoute"));
app.use("/message", require("./routes/MessageRoute"));


const cloudinary = require("./utils/cloudinary")





const server= app.listen(3000, function () {
    console.log("server started on port 3000")
})


const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  
  
  
  let activeUsers = [];
  
  
  
  
  
  app.post("/api/sendFile" , upload.single("file"),async (req,res)=>{
    try{
      console.log(req.file)
      if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path , {resource_type:"auto"})
        if(result){
          console.log(result)
          res.json({
            message: "uploaded to cloudinary",
            fileUrl : result.secure_url,
            public_id : result.public_id
          })
        }
      }
    }
    catch(error){
      console.log(error)
      res.json({
        message : "Error occurred while sending image",
        error:error
      })
    }
  })
  
  
  
  io.on("connection", (socket) => {
  
    // add new User
    socket.on("new-user-add", (newUserId) => {
      // if user is not added previously
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      // send all active users to new user
      io.emit("get-users", activeUsers);
    });
  
    
  
    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });
  
    // send message to a specific user
  
  
  
  
    socket.on("chat-start" ,async(data)=>{
      var {senderId ,receiverId} = data;
  
      const checkResult =await ChatModel.findOne({
        members: { $all: [senderId, receiverId] },
      });
  
      if(!checkResult){
        const newChat = new ChatModel({
          members: [senderId,receiverId],
        });
        var savedChat=newChat.save();
      }
      else{
        var savedChat= await ChatModel.findOneAndUpdate({_id:checkResult._id},
          {
            members: [senderId,receiverId],
          },
          {
            new:true,
          },
          )
      }
      
       try{
        if(savedChat){
            console.log("successfully stored")
  
              ChatModel.findOne({
              members: { $all: [senderId, receiverId]},
            } ,(err,foundResult)=>{
              if(foundResult){
                console.log("This is chatId:" + foundResult._id)
                let chatId= foundResult._id;
                socket.emit("chatId-receive" , chatId)
              }else{
                console.log("error in getting")
              }
            });
            
          }
        }
        catch(err){
          console.log(err);
          console.log("error in saving chat");
        }
      })
  
   
  
    socket.on("send-message", (data) => {
      const { chatId, from ,to ,to_table_name, from_table_name , msg_type ,public_id } = data;

      const user = activeUsers.find((user) => user.userId == to);
    
      console.log("Sending from socket to :", to)
      console.log("Data: ", data)
       
  
      
      const messageText=data.message
      const message = new MessageModel({
        _id:mongoose.Types.ObjectId(),
        chatId:chatId,
        from:from,
        to:to,
        to_table_name:to_table_name,
        from_table_name:from_table_name,
        message:messageText,
        msg_type:msg_type,
        public_id:public_id
    

      });
        message.save(function(err){
          if(!err){
            console.log("Message has been stored in message database")
          }else{
            console.log("Error in storing messages");
          }
        })
      if (user) {
        io.to(user.socketId).emit("receive-message", data);
      }
    });
    
  
  })