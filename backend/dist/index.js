"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const formeRoutes_1 = __importDefault(require("./routes/formeRoutes"));
const optionselect_1 = __importDefault(require("./routes/optionselect"));
const cors_2 = __importDefault(require("./middleware/cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)(cors_2.default));
app.use(express_1.default.json());
app.use("/from", formeRoutes_1.default);
app.use("/option", optionselect_1.default);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map