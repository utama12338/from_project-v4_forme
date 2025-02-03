"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const formeRoutes_js_1 = __importDefault(require("./routes/formeRoutes.js"));
const optionselect_js_1 = __importDefault(require("./routes/optionselect.js"));
app.use("/from", formeRoutes_js_1.default);
app.use("/option", optionselect_js_1.default);
const port = process.env.port || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map