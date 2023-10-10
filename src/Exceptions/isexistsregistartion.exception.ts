/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/

import { HttpException, HttpStatus } from '@nestjs/common';

export class IsExistsRegistartionException extends HttpException {
  constructor() {
    super('IsExistsRegistartion', HttpStatus.BAD_REQUEST);
  }
}
