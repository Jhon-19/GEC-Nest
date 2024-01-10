import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorEnum } from 'src/constants/errorx';

/**
 * The Exception is throwed when an Internal Server Error happened.
 */
export class ApiFailedException extends HttpException {
  private errorCode: number;

  constructor(err: ErrorEnum) {
    const [code, msg] = err.split(':');
    super(msg, HttpStatus.OK);
    this.errorCode = Number(code);
  }

  getErrorCode(): number {
    return this.errorCode;
  }
}
