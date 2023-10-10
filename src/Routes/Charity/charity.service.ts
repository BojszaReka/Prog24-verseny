import { Injectable } from '@nestjs/common';
import { CharityModel, UpdateCharityModel } from 'src/Models/Charity.model';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { IsExistsRegistartionException } from 'src/Exceptions/isexistsregistartion.exception';
import { IsNotExistsException } from 'src/Exceptions/isnotexists.exception';

const prisma: PrismaClient = new PrismaClient();

@Injectable()
export class CharityService {

    async create(cm: CharityModel) {
        try {

            const isExists =
                await prisma.food_offerer.findFirst({ where: { email: cm.email } }) ||
                await prisma.foodsaver.findFirst({ where: { email: cm.email } }) ||
                await prisma.charity.findFirst({ where: { email: cm.email } });

            if (isExists) {
                throw new IsExistsRegistartionException();
            }

            const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(cm.password, saltOrRounds);

            const c = await prisma.charity.create({
                data: {
                    email: cm.email,
                    password: hashedPassword,
                    phone: cm.phone,
                    name: cm.name,
                    roleId: cm.roleId,
                    zipcode: cm.zipcode,
                    locality: cm.locality,
                    address: cm.address,
                    latitude: cm.latitude,
                    longitude: cm.longitude
                }
            })
            const { password, ...rest } = c
            return rest
        } catch (error) {
            if (error instanceof IsExistsRegistartionException) {
                throw new IsExistsRegistartionException();
            }
            throw new Error("Adatbázis hiba!");
        }
    }

    async get() {
        try {
            const cs: Array<any> = await prisma.charity.findMany({
                select: {
                    id: true,
                    email: true,
                    name: true,
                    phone: true,
                    zipcode: true,
                    locality: true,
                    address: true,
                    latitude: true,
                    longitude: true,
                    role: true,
                    members: true

                }
            })

            return cs
        } catch (error) {
            throw new Error("Adatbázis hiba!");
        }
    }

    async getOne(id: number) {
        try {
            const c: CharityModel = await prisma.charity.findFirst({
                where: {
                    id: id
                },
                include: {
                    role: true,
                    members: true
                }
            })
            if (!c) {
                throw new IsNotExistsException();
            }
            const { password, ...rest } = c
            return rest
        } catch (error) {
            if (error instanceof IsNotExistsException) {
                throw new IsNotExistsException();
            }
            throw new Error("Adatbázis hiba!");
        }
    }

    async update(cm: UpdateCharityModel, id: number) {
        try {
            const c: UpdateCharityModel = await prisma.charity.update({
                where: {
                    id: id
                },
                data: {
                    name: cm.name,
                    phone: cm.phone,
                    zipcode: cm.zipcode,
                    locality: cm.locality,
                    address: cm.address,
                    latitude: cm.latitude,
                    longitude: cm.longitude
                }
            })
            return c
        } catch (error) {
            if (error.code == "P2025") {
                throw new IsNotExistsException();
            }
            throw new Error("Adatbázis hiba!");
        }
    }
}
