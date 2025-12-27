"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_route_1 = __importDefault(require("./services.route"));
const calc_controller_1 = __importDefault(require("../controllers/calc.controller"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.json({ message: "API is running" });
});
router.use("/services", services_route_1.default);
router.use("/calculate", calc_controller_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map