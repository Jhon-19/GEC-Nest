import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorEnum } from 'src/constants/errorx';
import { ApiFailedException } from 'src/exceptions/api-failed.exception';
import { IBaseResponse } from 'src/interfaces/response';
import { AppConfigService } from 'src/shared/services/app-config.service';

@Catch()
export class BaseExceptionFilter<T> implements ExceptionFilter {
  constructor(private readonly configService: AppConfigService) {}

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const httpStatus: number =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const apiErrorCode: number =
      exception instanceof ApiFailedException
        ? exception.getErrorCode()
        : httpStatus;

    let errorMessage: string =
      exception instanceof HttpException ? exception.message : `${exception}`;

    // hide the error message when the environment is production
    if (
      this.configService.isProduction &&
      httpStatus === HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      errorMessage = ErrorEnum.CODE_500;
    }

    const resBody: IBaseResponse = {
      msg: errorMessage,
      code: apiErrorCode,
      data: null,
    };

    response.status(httpStatus).json(resBody);
  }
}
