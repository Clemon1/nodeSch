import {
  getNotification,
  getUserNotifications,
  updateNotification,
  archiveNotification,
  getSingleNotification,
} from '../notification/notificationController.js';
import { Router } from 'express';
const router = Router();

router.route('/').get(getUserNotifications);
router.route('/all').get(getNotification);
router.route('/archive').post(archiveNotification);
router.route('/:id').get(getSingleNotification);
router.route('/:id').patch(updateNotification);

export default router;
