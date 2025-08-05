import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;



const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tourManagement:lhhvHpOSjDvJzyCQ@cluster0.mkbln.mongodb.net/tour-management-backend?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("connected to DB!!");
    server = app.listen(5000, () => {
      console.log("server is running port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

