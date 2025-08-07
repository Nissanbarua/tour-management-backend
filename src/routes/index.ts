import { Router } from "express";
import { UserRoute } from "../app/modules/user/user.route";

export const router = Router();

const modulesRoutes = [
  {
    path: "/user",
    route: UserRoute,
  },
];

modulesRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
