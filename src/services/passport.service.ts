import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from '../repositories/user.repository';

const SECRET_KEY = process.env.SECRET_OR_KEY;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
};

passport.use(
  'jwt-authentication',
  new Strategy(options, async (payload, done) => {
    const user = await UserRepository.getOneByUserId(payload.id);

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
);