"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_merror_1 = require("express-merror");
const users_route_1 = __importDefault(require("./routes/users.route"));
dotenv_1.default.config();
const app = express_1.default();
let morganOption = 'dev';
if (process.env.NODE_ENV === 'production') {
    morganOption = 'combined';
}
const middleware = [
    cors_1.default(),
    helmet_1.default(),
    morgan_1.default(morganOption),
    compression_1.default(),
    express_1.default.json(),
    express_1.default.urlencoded({ extended: true }),
];
app.use(...middleware);
// Disable powered by header
app.disable('x-powered-by');
// Routes
app.use('/api/users', users_route_1.default);
// Error response handler
app.use(express_merror_1.MerrorMiddleware());
module.exports = app;
