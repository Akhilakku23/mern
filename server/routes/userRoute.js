import express from 'express';
import { createUser,  bookVisit, getAllBookings, cancelBooking,  toFav, getAllFavorites } from '../controllers/user.Cntrl.js';
import jwtCheck from '../config/authConfig.js';

const router = express.Router();  // ✅ Fixed typo

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", jwtCheck, bookVisit );
router.post("/allBookings",  getAllBookings);
router.post("/removeBookings/:id", jwtCheck,  cancelBooking);
router.post("/toFav/:rid", jwtCheck, toFav);
router.post("/allFav", jwtCheck, getAllFavorites);


export { router as userRoute };  // ✅ Fixed export
