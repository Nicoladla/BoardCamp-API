import { Router } from "express";
import rentalsValidation from "../middlewares/rentalsValidationMiddleware.js";
import rentalsIdValidation from "../middlewares/rentalsIdValidationMiddleware.js";

import {
  getRentals,
  postRentals,
  patchRentals,
  deleteRentals,
} from "../controllers/rentalsControllers.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", rentalsValidation, postRentals);
router.patch("/rentals/:id/return", rentalsIdValidation, patchRentals);
router.delete("/rentals/:id", rentalsIdValidation, deleteRentals);

export default router;
