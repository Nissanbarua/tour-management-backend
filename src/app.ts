import express, { Request, Response } from "express";
import { UserRoute } from "./app/modules/user/user.route";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

// API ENDPOINTS
app.use("/api/v1/user", UserRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome To Tour Management database",
  });
});

export default app;
