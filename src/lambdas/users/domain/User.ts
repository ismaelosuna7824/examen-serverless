import { UserEntity } from '../infrastructure/domain/user.entity';

export interface IUserSchema{
    id?: number | undefined;
    username: string;
    email: string;
}


export class User {
    private _entityRoot: IUserSchema;

    constructor(user?: IUserSchema){
        if(user){
          this._entityRoot = user;
        }else{
            this._entityRoot = new UserEntity();
        }
    }

    get id(): number | undefined {
        return this._entityRoot.id;
    }

    get username(): string {
        return this._entityRoot.username;
    }

    get email(): string {
        return this._entityRoot.email;
    }

    public entityRoot(): IUserSchema{
        return this._entityRoot;
    }
}
