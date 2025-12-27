import { Router } from "express";
import servicesRouter from "./services.route";
import calcRouter from "./calculate.route";
import extrasRouter from "./extras.route";

const router = Router();

router.get("/", (req, res) => {
  res.json({ 
    message: "API потолочной компании",
    version: "1.0.0",
    endpoints: {
      services: "/api/services",
      extras: "/api/extras",
      calculate: "/api/calculate",
      order: "/api/calculate/order"
    }
  });
});

router.use("/services", servicesRouter);
router.use("/extras", extrasRouter);
router.use("/calculate", calcRouter);

export default router;