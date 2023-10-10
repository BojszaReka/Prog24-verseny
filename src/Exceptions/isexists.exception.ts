/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/

import { HttpException, HttpStatus } from '@nestjs/common';

export class IsExistsException extends HttpException {
  constructor() {
    super('IsExists', HttpStatus.BAD_REQUEST);
  }
}
