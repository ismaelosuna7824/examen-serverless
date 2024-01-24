import { BadRequestException } from '@commons/exceptions/bad-request.exception';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UserBody {

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Length(4, 32)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 32)
  @Matches("^[\\w!\\'#$%&()*+\\\\,-.\\]\\[:;<=>?@\\/\\s{|}~^_`]+$")
  email: string;

  constructor(props: UserBody) {
    Object.assign(this, props);
    this._nameValidation();
  }

  private _nameValidation(): void {
    this.username = this.username.trim();
    this.email = this.email.trim();
    if (this.username.length === 0) {
      throw new BadRequestException({
        code: 'bad_request',
        detail: 'The username request is not valid',
      });
    }
    if (this.username.length === 0) {
      throw new BadRequestException({
        code: 'bad_request',
        detail: 'The email request is not valid',
      });
    }
  }
}
