import { ICommand } from "@commons/interfaces/command.interface";
import { Type } from "class-transformer";
import { IsObject, ValidateNested } from "class-validator";
import { UserBody } from "../user-body";

export class UpdateUserCommand implements ICommand {
    @IsObject()
    @ValidateNested()
    @Type(() => UserBody)
    body: UserBody;
    constructor(props: Partial<UpdateUserCommand>) {
      Object.assign(this, props);
    }
  }