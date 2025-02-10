import { Router } from 'express';
import { LocalUserRoutes } from '../modules/LocalUser/LU.route';
import { UserRoutes } from '../modules/User/user.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/local-users',
    route: LocalUserRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
