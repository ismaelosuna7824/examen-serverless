import { User } from "@lambdas/users/domain/User";

export interface IListUserDTO {
    id: number;
    username: string;
    email: string;

  }
  
  export function GetUsersMap(user: User): IListUserDTO {
    const response: IListUserDTO = {
      id: user.id,
      username: user.username,
      email: user.email
    };
  
    return response;
  }
  