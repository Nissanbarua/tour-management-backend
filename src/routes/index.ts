import { Router } from "express";
import { UserRoute } from "../app/modules/user/user.route";
import { AuthRoutes } from "../app/modules/auth/auth.route";

export const router = Router();

const modulesRoutes = [
  {
    path: "/user",
    route: UserRoute,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

modulesRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
