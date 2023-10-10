import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IsExistsRegistartionException } from 'src/Exceptions/isexistsregistartion.exception';
import * as bcrypt from 'bcrypt';
import { FoodSaverModel, UpdateFoodSaverModel } from 'src/Models/FoodSaver.model';
import { IsNotExistsException } from 'src/Exceptions/isnotexists.exception';

const prisma = new PrismaClient();


@Injectable()
export class FoodsaverService {
    async create(fs: FoodSaverModel) {
        try {

            const isExists =
                await prisma.food_offerer.findFirst({ where: { email: fs.email } }) ||
                await prisma.foodsaver.findFirst({ where: { email: fs.email } }) ||
                await prisma.charity.findFirst({ where: { email: fs.email } });

            if (isExists) {
                throw new IsExistsRegistartionException();
            }

            const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(fs.password, saltOrRounds);

            const f = await prisma.foodsaver.create({
                data: {
                    email: fs.email,
                    name: fs.name,
                    locality: fs.locality,
                    phone: fs.phone,
                    latitude: fs.latitude,
                    longitude: fs.longitude,
                    password: hashedPassword,
                    birthyear: fs.birthyear,
                    roleId: 3,
                    kitchenId: fs.kitchenId,
                    allergens: fs.allergens
                }
            });
            const { password, ...rest } = f;
            return rest;
        } catch (error) {
            if (error instanceof IsExistsRegistartionException) {
                throw new IsExistsRegistartionException();
            }
            throw new Error("Adatbázis hiba!");
        }
    }

    async get() {
        try {
            const fs: Array<any> = await prisma.foodsaver.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    locality: true,
                    latitude: true,
                    longitude: true,
                    role: true,
                    allergens: true,
                    birthyear: true,
                    kitchen_type: true,

                }
            });

            return fs;
        } catch (error) {
            throw new Error("Adatbázis hiba!");
        }
    }

    async getOne(id: number) {
        try {

            const fs = await prisma.foodsaver.findFirst({
                where: {
                    id: id
                },
                include: {
                    allergens: true,
                    kitchen_type: true,
                    role: true
                }
            });

            if (!fs) {
                throw new IsNotExistsException();
            }
            const { password, ...rest } = fs;
            return rest;
        } catch (error) {
            if (error instanceof IsNotExistsException) {
                throw new IsNotExistsException();
            }
            throw new Error("Adatbázis hiba!");
        }
    }

    async update(id: number, fs: UpdateFoodSaverModel) {
        try {
            const f = await prisma.foodsaver.update({
                where: {
                    id: id
                },
                data: {
                    name: fs.name,
                    phone: fs.phone,
                    locality: fs.locality,
                    latitude: fs.latitude,
                    longitude: fs.longitude,
                    birthyear: fs.birthyear,
                    kitchenId: fs.kitchenId,
                    allergens: fs.allergens
                }
            });

            const { password, ...rest } = f;
            return rest;
        } catch (error) {
            if (error.code == "P2025") {
                throw new IsNotExistsException();
            }
            throw new HttpException("Adatbázis hiba!", HttpStatus.BAD_REQUEST);
        }
    }
}

