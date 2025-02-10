import express, { NextFunction, Request, Response } from 'express';
import { LocalUserControllers } from './LU.controller';
import validateRequest from '../../middlewares/validateRequest';
import { LocalUserValidation } from './LU.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.get('/', LocalUserControllers.getAllLocalUser);
router.get('/:id', LocalUserControllers.getSingleLocalUser);
router.patch(
  '/:id',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(LocalUserValidation.updateLocalUserValidationSchema),
  LocalUserControllers.updateLocalUser,
);
router.delete('/:id', LocalUserControllers.deleteLocalUser);

export const LocalUserRoutes = router;
