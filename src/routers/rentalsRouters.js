import { Router } from "express";
import rentalsValidationMiddleware from "../middlewares/rentalsValidationMiddleware.js";

import {
  getRentals,
  postRentals,
  patchRentals,
  deleteRentals,
} from "../controllers/rentalsControllers.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", rentalsValidationMiddleware, postRentals);
router.patch("/rentals/:id/return", patchRentals);
router.delete("/rentals/:id", deleteRentals);

export default router;
