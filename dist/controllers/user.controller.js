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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const user_repository_1 = require("../repositories/user.repository");
dotenv.config();
const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);
const SECRET_KEY = process.env.SECRET_OR_KEY || "";
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, username } = req.body;
    const existingUser = yield user_repository_1.UserRepository.getOne({ where: { email } });
    const existingUserId = yield user_repository_1.UserRepository.getOne({ where: { userId: username } });
    if (existingUser) {
        res.status(400).send({
            message: 'Email already taken'
        });
    }
    else if (existingUserId) {
        res.status(400).send({
            message: 'UserId already taken'
        });
    }
    else {
        const salt = yield bcrypt.genSalt(SALT_ROUND);
        const hashPassword = yield bcrypt.hash(password, salt);
        const user = yield user_repository_1.UserRepository.createOne({
            name,
            email,
            password: hashPassword
        });
        yield user_repository_1.UserRepository.save(user);
        res.send({ message: 'User Creation Successful' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    const user = yield user_repository_1.UserRepository.getOne({
        where: { userId: userName }
    });
    console.log(user);
    if (!user) {
        res.status(400).send({ message: 'Invalid userName or password' });
    }
    else {
        const isSuccess = yield bcrypt.compare(password, user.password);
        if (isSuccess) {
            const payload = {
                email: user.email,
                userName: user.userId,
                name: user.name
            };
            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 3600 });
            res.status(200).send({ token });
        }
        else {
            res.status(400).send({ message: 'Invalid email or password' });
        }
    }
});
exports.login = login;
