import mongoose from "mongoose";

export const connectDb = async () => {

  try {
    await mongoose.connect("mongodb+srv://emaildasantservices:12345@braxas.8roq6.mongodb.net/?retryWrites=true&w=majority&appName=Braxas" , {
      dbName : "Braxas"
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
    console.log("Database Error");
  } 

}
