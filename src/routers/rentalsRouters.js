import { Router } from "express";
import rentalsValidationMiddleware from "../middlewares/rentalsValidationMiddleware.js";

import {
  getRentals,
  postRentals,
  putRentals,
  deleteRentals,
} from "../controllers/rentalsControllers.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", rentalsValidationMiddleware, postRentals);
router.put("/rentals/:id/return", putRentals);
router.delete("/rentals", deleteRentals);

export default router;
