import { ICommand } from "@commons/interfaces/command.interface";
import { Type } from "class-transformer";
import { IsObject, ValidateNested } from "class-validator";
import { UserBody } from "../user-body";

export class CreateUserCommand implements ICommand {
    @IsObject()
    @ValidateNested()
    @Type(() => UserBody)
    body: UserBody;
    constructor(props: Partial<CreateUserCommand>) {
      Object.assign(this, props);
    }
  }