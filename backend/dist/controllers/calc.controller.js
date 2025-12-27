"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcPrice = void 0;
const calcPrice = (req, res) => {
    try {
        const { area, pricePerMeter } = req.body;
        if (!area || !pricePerMeter) {
            return res.status(400).json({ error: "area and pricePerMeter required" });
        }
        const total = Number(area) * Number(pricePerMeter);
        return res.json({
            area,
            pricePerMeter,
            total,
            message: "Расчёт выполнен успешно",
        });
    }
    catch (error) {
        return res.status(500).json({ error: "Ошибка сервера" });
    }
};
exports.calcPrice = calcPrice;
exports.default = exports.calcPrice;
//# sourceMappingURL=calc.controller.js.map