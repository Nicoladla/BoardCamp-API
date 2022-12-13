import { Router } from "express";
import rentalsValidation from "../middlewares/rentalsValidationMiddleware.js";
import rentalsIdValidation from "../middlewares/rentalsIdValidationMiddleware.js";

import {
  getRentals,
  postRentals,
  postPatchRentals,
  deleteRentals,
} from "../controllers/rentalsControllers.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", rentalsValidation, postRentals);
router.post("/rentals/:id/return", rentalsIdValidation, postPatchRentals);
router.delete("/rentals/:id", rentalsIdValidation, deleteRentals);

export default router;
