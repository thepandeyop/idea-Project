import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv';
import { UserRepository } from '../repositories/user.repository';
dotenv.config();

const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);
const SECRET_KEY = process.env.SECRET_OR_KEY || "";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, username } = req.body;

  const existingUser = await UserRepository.getOne({where: {email}})
  const existingUserId = await UserRepository.getOne({where: {userId: username}})
  if (existingUser) {
    res.status(400).send({
      message: 'Email already taken'
    });
  } else if(existingUserId){
    res.status(400).send({
        message: 'UserId already taken'
      });
  } else {
    const salt = await bcrypt.genSalt(SALT_ROUND);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await UserRepository.createOne({
      name,
      email,
      password: hashPassword,
      userId: username
    });

    await UserRepository.save(user);

    res.send({ message: 'User Creation Successful' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  const user = await UserRepository.getOne({
    where: {userId: userName}
  });

  console.log(user)

  if (!user) {
    res.status(400).send({ message: 'Invalid userName or password' });
  } else {
    const isSuccess = await bcrypt.compare(password, user.password);

    if (isSuccess) {
      const payload = {
        email: user.email,
        userName: user.userId,
        name: user.name
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 3600 });
      res.status(200).send({ token });
    } else {
      res.status(400).send({ message: 'Invalid email or password' });
    }
  }
};