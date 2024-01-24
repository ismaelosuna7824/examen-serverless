import { User } from "../User";


interface IUserRepository {
    persist(model: User): Promise<void>;
    update(model: User): Promise<void>;
    delete(id: number): Promise<void>;
    getUser(id: number): Promise<User>;
    list(): Promise<User[]>;
}

export type { IUserRepository };