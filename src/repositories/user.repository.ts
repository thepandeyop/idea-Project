import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export class UserRepository {
    static userRepository: Repository<User>;

    static getOneByUserId(userId: string) {
        return this.userRepository.findOneBy({userId: userId})
    }
    static getOne(options: FindOneOptions<User>) {
        return this.userRepository.findOne(options)
    }

    static createOne(user: Partial<User>){
        return this.userRepository.create(user);
    }

    static save(user: Partial<User>){
        return this.userRepository.save(user);
    }

    static initialize(ds: DataSource) {
        this.userRepository = ds.getRepository(User);
    }
}