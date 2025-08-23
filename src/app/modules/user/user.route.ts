import { Router } from "express";
import { userController } from "./user.controller";
import { createZodUserSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();
router.post(
  "/register",
  validateRequest(createZodUserSchema),
  userController.createUser
);
router.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  userController.getAllUsers
);
router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  userController.updateUser
);

export const UserRoute = router;
