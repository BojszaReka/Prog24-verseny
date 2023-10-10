/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/

import { HttpException, HttpStatus } from '@nestjs/common';

export class NoMatchesPasswordAndEmailException extends HttpException {
  constructor() {
    super('Rossz email vagy jelszó!', HttpStatus.BAD_REQUEST);
  }
}
