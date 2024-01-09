import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class BaseFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
