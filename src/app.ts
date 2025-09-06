import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";
import { globalErrorHandler } from "./app/middlewares/globalMiddleWareHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import "./config/passport";

const app = express();

app.use(
  expressSession({
    secret: "your Secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// API ENDPOINTS
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome To Tour Management database",
  });
});

// errorHandler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
