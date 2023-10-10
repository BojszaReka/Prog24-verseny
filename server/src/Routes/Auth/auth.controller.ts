/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginModel } from 'src/Models/Login.model';
import { AuthGuard } from './auth.guard';
import { Roles } from './roles.decorator';
import { Role } from 'src/Enums/role.enum';

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    async login(@Body() loginData: LoginModel) {
        return await this.authService.login(loginData);
    }

    @Get('/isLoggedIn')
    @UseGuards(new AuthGuard(Role.NONE))
    isLoggedIn() {
        return true;
    }
}
