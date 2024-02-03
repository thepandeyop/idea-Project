"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const mysql_config_1 = require("./config/mysql.config");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const user_repository_1 = require("./repositories/user.repository");
dotenv.config();
exports.appDataSource = new typeorm_1.DataSource((0, mysql_config_1.MySqlConfig)());
exports.appDataSource.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use(bodyParser.json());
    app.use('/users', user_routes_1.default);
    const PORT = process.env.PORT;
    user_repository_1.UserRepository.initialize(exports.appDataSource);
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
