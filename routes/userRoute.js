import express from 'express';
import { loginUser, registerUser, adminLogin, frontendMail, getUserProfile, updateProfile, updateUserDetails, userAvatarController, removeImageFromCloudinary } from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import profileAuth from '../middleware/profileAuth.js';
import authUser from '../middleware/auth.js';
import uploader from '../middleware/avatarUpload.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/send-mail', frontendMail)
userRouter.get('/profile', profileAuth, getUserProfile)
userRouter.put('/profile', authUser, updateProfile);
userRouter.put('/user-avatar', auth, uploader.array('avatar'), userAvatarController)
userRouter.put('/:id', authUser, updateUserDetails)
userRouter.delete('/deleteImage', auth, removeImageFromCloudinary)

export default userRouter;