/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/

import { HttpException, HttpStatus } from '@nestjs/common';

export class IsNotExistsException extends HttpException {
  constructor() {
    super('Isnotexists', HttpStatus.BAD_REQUEST);
  }
}
