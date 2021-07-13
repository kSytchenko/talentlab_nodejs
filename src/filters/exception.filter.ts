import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

import { GeneralException } from '../exceptions/general.exception';

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  catch(exception: GeneralException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response
      .status(exception.statusCode)
      .json({
        message: exception.message,
        statusCode: exception.statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}