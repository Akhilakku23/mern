import express from 'express';
import { createUser } from '../controllers/user.Cntrl.js';

const router = express.Router();  // ✅ Fixed typo

router.post("/register", createUser);
// router.post("/bookVisit/:id", bookVisit);

export { router as userRoute };  // ✅ Fixed export
