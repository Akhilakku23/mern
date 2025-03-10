import express from 'express';
import { createUser } from '../controllers/user.Cntrl.js';
import { bookVisit } from '../controllers/user.Cntrl.js';
import  {getAllBookings} from '../controllers/user.Cntrl.js';



const router = express.Router();  // ✅ Fixed typo

router.post("/register", createUser);
router.post("/bookVisit/:id",  bookVisit );
router.post("/allBookings", getAllBookings);


export { router as userRoute };  // ✅ Fixed export
