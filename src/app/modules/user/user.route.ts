import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import z from "zod";

const router = Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const createZodUserSchema = z.object({
      name: z
        .string({ error: "name must be string" })
        .min(2, { message: "Name too short" })
        .max(50, { message: "Name too long" }),
      email: z.string().email(),
      password: z
        .string()
        .min(8)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
        ),
      phone: z
        .string()
        .regex(
          /^(?:\+880|880|0)1[3-9]\d{8}$/,
          "Invalid Bangladeshi phone number"
        )
        .optional(),
    });
    req.body = await createZodUserSchema.parseAsync(req.body);
    next();
  },

  userController.createUser
);
router.get("/all-users", userController.getAllUsers);

export const UserRoute = router;
