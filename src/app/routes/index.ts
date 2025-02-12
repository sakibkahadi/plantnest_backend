import { Router } from 'express';
import { LocalUserRoutes } from '../modules/LocalUser/LU.route';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CategoryRoutes } from '../modules/Category/category.route';

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
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
