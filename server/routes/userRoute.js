import express from 'express';
import { createUser,  bookVisit, getAllBookings, cancelBooking,  toFav, getAllFavorites } from '../controllers/user.Cntrl.js';

const router = express.Router();  // ✅ Fixed typo

router.post("/register", createUser);
router.post("/bookVisit/:id",  bookVisit );
router.post("/allBookings", getAllBookings);
router.post("/removeBookings/:id",  cancelBooking);
router.post("/toFav/:rid", toFav);
router.post("/allFav", getAllFavorites);


export { router as userRoute };  // ✅ Fixed export
