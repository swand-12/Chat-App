import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUSersForSidebar=async(req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const FilteredUsers =await User.find({_id :{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(FilteredUsers);

    } catch (error) {
        console.log("Problem in GetUserForSideBar Control"+error.message);
        res.status(500).json({message:"Server Error"});
    }
}
export const getMessages =async(req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const myID=req.user._id;
        const messages = await Message.find({
            $or: [
              { myID: userToChatId, receiverId: myID },
              { myID: myID, receiverId: userToChatId }
            ]
          });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Problem in GetMessages Control"+error.message);
        res.status(500).json({message:"Server Error"});
    }
}

export const SendMessage =async(req,res)=>{
    const { id: receiverid } = req.params;
    const senderId= req.user._id;
    const { text, image } = req.body;
    let imageurl;
    if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageurl=uploadResponse.secure_url;

    }
    
    try {
      const newMessage =new Message({
        receiverid,
        senderId,
        text,
        imageurl,
      })
      await newMessage.save();
      // todo: real time functionality with socket.io

    
      res.status(200).json(newMessage);
    } catch (error) {
      console.error("Error in Send message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
}