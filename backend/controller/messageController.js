import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import {Message} from "../model/message.js";
import { ErrorHandler } from "../utils/ErrorHandler.js"


// Create Message ----------------------> Public

export const createMessage = catchAsyncError(async (req, res , next) => {
  
  let {name , email, phone, message} = req.body;

  if(!name || !phone || !message){
    return next(new ErrorHandler("Please Fill All The Required Feilds", 401));
  }

  if(name.length < 8 || message.length < 10 || phone.length < 10){
    return next(new ErrorHandler("Name must be 8 characters long and Message & Phone must be 10 characters long", 401));
  }

  if(!email){
    email = "No Email Provided";
  }

  const newMessage = await Message.create({
    name,
    email,
    phone,
    message,
  });

  res.status(201).json({
    success: true,
    newMessage,
    message : "WE Received Your Message, We Will Contact You Soon !!!",
  });

});


// Get All Messages ----------------------> Only Admin

export const getAllMessages = catchAsyncError(async (req, res , next) => {
  const messages = await Message.find();

  res.status(200).json({
    success: true,
    messages,
  });
});


// Get Single Message ----------------------> Only Admin

export const getSingleMessage = catchAsyncError(async (req, res , next) => {
  const message = await Message.findById(req.params.id);

  if(!message){
    return next(new ErrorHandler("Message Not Found", 404));
  }

  res.status(200).json({
    success: true,
    message,
  });

});


// Delete Message ----------------------> Only Admin

export const deleteMessage = catchAsyncError(async (req, res , next) => {
  const message = await Message.findByIdAndDelete(req.params.id);

  if(!message){
    return next(new ErrorHandler("Message Not Found", 404));
  }

  res.status(200).json({
    success: true,
    message : "Message Deleted Successfully",
  });

})