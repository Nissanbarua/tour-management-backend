import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";
import { globalErrorHandler } from "./app/middlewares/globalMiddleWareHandler";
import notFound from "./app/middlewares/notFound";

const app = express();
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
