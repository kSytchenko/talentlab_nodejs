import { Logger } from '@nestjs/common';

export class GeneralException extends Error {
  private readonly logger: Logger = new Logger();

  constructor(public message: string, public statusCode: number) {
    super(message);
    this.logger.error(message);
  }
}