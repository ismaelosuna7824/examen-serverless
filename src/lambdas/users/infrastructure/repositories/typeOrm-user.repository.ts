import { Repository } from "typeorm";
import { IUserRepository } from "../../domain/contracts/user-repository";
import { UserEntity } from "../domain/user.entity";
import { delay, inject, injectable } from "tsyringe";
import { DatabaseConnection } from "@commons/config/database";
import { User } from '../../domain/User';

@injectable()
export class UserRepository implements IUserRepository{
    protected userRepository: Repository<UserEntity>;

    constructor(
        @inject(delay(() => DatabaseConnection)) 
        private database: DatabaseConnection) {
        this.userRepository = this.database.getConnection().getRepository(UserEntity);
      }

    async persist(model: User): Promise<void> {
         try {
            await this.userRepository.save(model.entityRoot())
         } catch (error) {
            throw error;
         }
    }

    async update(model: User): Promise<void>{
      try{
         await this.userRepository.update({id: model.id}, model.entityRoot());
      } catch(error){
         throw error;
      }
    }

    async list(): Promise<User[]>{
      try{
         const list = await this.userRepository.find();
         return list.map((user)=> new User(user));
      }catch(error){
         throw error;
      }
    }

    async delete(id:number): Promise<void>{
      try {
         const respo = await this.userRepository.delete({id})
         console.log(respo);
      } catch (error) {
         throw error;
      }
    }

    async getUser(id: number): Promise<User>{
      try {
         const user = await this.userRepository.findOneOrFail({
            where: {id}
         });
         return new User(user);
      } catch (error) {
         throw error;
      }
    }
}