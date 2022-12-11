import { Router } from "express";

import {
  getCustomers,
  postCustomers,
  putCustomers,
} from "../controllers/customersControllers.js";

const router = Router();

router.get("/customers", getCustomers);
router.post("/customers", postCustomers);
router.put("/customers", putCustomers);

export default router;
