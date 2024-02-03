"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_entity_1 = require("../entities/user.entity");
class UserRepository {
    static getOneByUserId(userId) {
        return this.userRepository.findOneBy({ userId: userId });
    }
    static getOne(options) {
        return this.userRepository.findOne(options);
    }
    static createOne(user) {
        return this.userRepository.create(user);
    }
    static save(user) {
        return this.userRepository.save(user);
    }
    static initialize(ds) {
        this.userRepository = ds.getRepository(user_entity_1.User);
    }
}
exports.UserRepository = UserRepository;
