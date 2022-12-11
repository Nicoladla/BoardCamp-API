import { Router } from "express";

import {
  getRentals,
  postRentals,
  putRentals,
  deleteRentals,
} from "../controllers/rentalsControllers";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", postRentals);
router.put("/rentals", putRentals);
router.delete("/rentals", deleteRentals);

export default router;
