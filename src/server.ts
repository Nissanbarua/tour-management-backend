/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);

    console.log("connected to DB!!");
    server = app.listen(envVars.PORT, () => {
      console.log(`server is running port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
seedSuperAdmin();

process.on("unhandledRejection", () => {
  console.log("unhandled rejection detected.... Server is shutting down");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on("uncaughtException", () => {
  console.log("Uncaught exception detected.... Server is shutting down");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on("SIGTERM", () => {
  console.log("Signal recieved ... Server is shutting down");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});
