import { ErrorEnum } from '@commons/enums/error.enum';
import { IErrorCore } from '@commons/interfaces/error.core.interface';
import { ValidationError } from 'class-validator';
import { EntityNotFoundError, TypeORMError } from 'typeorm';
import { BadRequestException } from './bad-request.exception';
import { ConflictException } from './conflict.exception';
import { HttpErrorResponse } from './http-response.exception';
import { InternalServerException } from './internal-server.exception';
import { NotFoundException } from './not-found.exception';

export class ErrorHandler {
  constructor(error: unknown) {
    if (error instanceof Array) {
      this.isClassValidatorError(error);
    }

    if (error instanceof TypeORMError) {
      this.isTypeOrmError(error);
    }

    if (error instanceof NotFoundException) {
      this.isTypeNotFoundException(error);
    }

    if (error instanceof ConflictException) {
      this.isTypeConflictException(error);
    }

    if (error instanceof Error) {
      this.handlerCoreError(error);
    }

    throw new InternalServerException({
      code: ErrorEnum.INTERNAL_SERVER_ERROR,
      detail: ErrorEnum.INTERNAL_SERVER_ERROR,
    });
  }

  private handlerCoreError(error: Error): void {
    const {
      code = null,
      detail = null,
      statusCode = null,
    } = JSON.parse(error.message) as IErrorCore;
    if (code && detail && statusCode) {
      throw new HttpErrorResponse(statusCode, { code, detail });
    }
  }

  private isTypeNotFoundException(error: NotFoundException): void {
    const body = JSON.parse(error.body);
    throw new NotFoundException({
      code: body.code,
      detail: body.detail,
    });
  }

  private isTypeConflictException(error: ConflictException): void {
    const body = JSON.parse(error.body);
    throw new ConflictException({
      code: body.code,
      detail: body.detail,
    });
  }

  private isTypeOrmError(error: TypeORMError): void {
    if (error instanceof EntityNotFoundError) {
      throw new NotFoundException({
        code: ErrorEnum.ENTITY_NOT_FOUND,
        detail: ErrorEnum.ENTITY_NOT_FOUND,
      });
    }

    throw new InternalServerException({
      code: ErrorEnum.INTERNAL_SERVER_ERROR,
      detail: ErrorEnum.INTERNAL_SERVER_ERROR,
    });
  }

  private isClassValidatorError(errors: ValidationError[]): void | null {
    const isNot = errors.find((err) => err instanceof ValidationError === false);

    if (isNot) {
      return null;
    }

    let detail = '';
    errors.forEach(({ constraints = null }) => {
      if (constraints) {
        const values = Object.values(constraints);

        detail += values.join('. ');
      }
    });

    throw new BadRequestException({ code: ErrorEnum.BAD_REQUEST, detail });
  }
}
