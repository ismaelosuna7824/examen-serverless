import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteUserCommand {
    @IsNumber()
    @IsNotEmpty()
    id: number;
  
    constructor(props: DeleteUserCommand) {
      this.id = +this.id;
      Object.assign(this, props);
    }


  }
  