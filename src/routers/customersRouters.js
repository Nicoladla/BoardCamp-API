import { Router } from "express";
import customerValidation from "../middlewares/customerValidationMiddlewares.js";

import {
  getCustomers,
  getCustomersId,
  postCustomers,
  putCustomers,
} from "../controllers/customersControllers.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersId);
router.post("/customers", customerValidation, postCustomers);
router.put("/customers/:id", customerValidation, putCustomers);

export default router;
