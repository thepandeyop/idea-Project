/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - fullname
 *       properties:
 *         username:
 *           type: string
 *           description: The unique user alias
 *         email:
 *           type: string
 *           description: The title of your book
 *         password:
 *           type: string
 *           description: The book author
 *         fullname:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *       example:
 *         username: rocketBoys
 *         email: rocketboys@gmail.com
 *         password: test1234
 *         fullname: Rocket Singh
 */
import * as express from 'express';
import { Router } from 'express';
import { register, login } from '../controllers/user.controller';

const userRouter: Router = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);

export default userRouter;