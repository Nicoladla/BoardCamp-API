import { Router } from "express";
import customerValidation from "../middlewares/customerValidationMiddlewares.js";

import {
  getCustomers,
  postCustomers,
  putCustomers,
} from "../controllers/customersControllers.js";

const router = Router();

router.get("/customers", getCustomers);
router.post("/customers", customerValidation, postCustomers);
router.put("/customers/:id", customerValidation, putCustomers);

export default router;
