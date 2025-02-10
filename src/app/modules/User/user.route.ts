import express, { NextFunction, Request, Response } from 'express';
import { upload } from '../../utils/sendImageToCloudinary';
import validateRequest from '../../middlewares/validateRequest';
import { LocalUserValidation } from '../LocalUser/LU.validation';
import { UserControllers } from './user.controller';
const router = express.Router();
router.post(
  '/create-user',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(LocalUserValidation.createLocalUserValidationSchema),
  UserControllers.createLocalUser,
);

export const UserRoutes = router;
