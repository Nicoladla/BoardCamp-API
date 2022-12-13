import { Router } from "express";

import customerValidation from "../middlewares/customerValidationMiddlewares.js";
import customerIdValidation from "../middlewares/customerIdValidationMiddlewares.js";

import {
  getCustomers,
  getCustomersId,
  postCustomers,
  putCustomers,
} from "../controllers/customersControllers.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", customerIdValidation, getCustomersId);
router.post("/customers", customerValidation, postCustomers);
router.put("/customers/:id", customerIdValidation, customerValidation, putCustomers);

export default router;
