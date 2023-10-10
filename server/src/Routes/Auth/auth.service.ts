import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IsNotExistsException } from 'src/Exceptions/isnotexists.exception';
import { LoginModel, LoginResponseModel } from 'src/Models/Login.model';
import * as bcrypt from 'bcrypt';
import { NoMatchesPasswordAndEmailException } from 'src/Exceptions/nomatchespasswordandemail.exception';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async login(login: LoginModel) {
        try {
            const user =
                await prisma.food_offerer.findFirst({ where: { email: login.email } }) ||
                await prisma.foodsaver.findFirst({ where: { email: login.email } }) ||
                await prisma.charity.findFirst({ where: { email: login.email } });

            if (!user) {
                throw new IsNotExistsException();
            }

            const isMatch = await bcrypt.compare(login.password, user.password);
            if (!isMatch) {
                throw new NoMatchesPasswordAndEmailException();
            }

            const payload = { email: user.email, name: user.name, id: user.id, role: user.roleId };

            const res: LoginResponseModel = {
                name: user.name,
                email: user.email,
                phone: user.phone,
                roleId: user.roleId,
                latitude: user.latitude,
                longitude: user.longitude,
                locality: user.locality,

                token: await this.jwtService.signAsync(payload)
            }

            return res;

        } catch (error) {
            if (error instanceof IsNotExistsException) {
                throw new IsNotExistsException();
            }
            if (error instanceof NoMatchesPasswordAndEmailException) {
                throw new NoMatchesPasswordAndEmailException();
            }
            throw new HttpException("Adatbázis hiba!", HttpStatus.BAD_REQUEST);
        }
    }
}
