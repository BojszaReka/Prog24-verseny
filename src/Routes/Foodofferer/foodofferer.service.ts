import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FoodOffererModel, UpdateFoodOffererModel } from 'src/Models/FoodOfferer.model';
import * as bcrypt from 'bcrypt';
import { IsExistsRegistartionException } from 'src/Exceptions/isexistsregistartion.exception';
import { IsNotExistsException } from 'src/Exceptions/isnotexists.exception';

const prisma = new PrismaClient();

@Injectable()
export class FoodoffererService {


    async create(fo: FoodOffererModel) {
        try {

            const isExists =
                await prisma.food_offerer.findFirst({ where: { email: fo.email } }) ||
                await prisma.foodsaver.findFirst({ where: { email: fo.email } }) ||
                await prisma.charity.findFirst({ where: { email: fo.email } });

            if (isExists) {
                throw new IsExistsRegistartionException();
            }

            const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(fo.password, saltOrRounds);

            const f = await prisma.food_offerer.create({
                data: {
                    email: fo.email,
                    name: fo.name,
                    address: fo.address,
                    locality: fo.locality,
                    zipcode: fo.zipcode,
                    phone: fo.phone,
                    latitude: fo.latitude,
                    longitude: fo.longitude,
                    password: hashedPassword,
                    roleId: 2,
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
            const fo: Array<any> = await prisma.food_offerer.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    zipcode: true,
                    locality: true,
                    address: true,
                    food: true,
                    latitude: true,
                    longitude: true,
                    role: true
                }
            });

            return fo;
        } catch (error) {
            throw new Error("Adatbázis hiba!");
        }
    }

    async getOne(id: number) {
        try {

            const fo = await prisma.food_offerer.findFirst({
                where: {
                    id: id
                },
                include: {
                    food: true,
                    role: true
                }
            });

            if (!fo) {
                throw new IsNotExistsException();
            }
            const { password, ...rest } = fo;
            return rest;
        } catch (error) {
            if (error instanceof IsNotExistsException) {
                throw new IsNotExistsException();
            }
            throw new Error("Adatbázis hiba!");
        }
    }

    async update(id: number, fo: UpdateFoodOffererModel) {
        try {
            const f = await prisma.food_offerer.update({
                where: {
                    id: id
                },
                data: {
                    name: fo.name,
                    zipcode: fo.zipcode,
                    locality: fo.locality,
                    address: fo.address,
                    latitude: fo.latitude,
                    longitude: fo.longitude,
                }
            });

            const { password, ...rest } = f;
            return rest;
        } catch (error) {
            if(error.code == "P2025"){
                throw new IsNotExistsException();
            }
            throw new Error("Adatbázis hiba!");
        }
    }



}
