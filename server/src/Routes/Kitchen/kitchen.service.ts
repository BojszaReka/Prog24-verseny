import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { KitchenModel } from 'src/Models/Kitchen.model';
import { PrismaClient } from '@prisma/client';
const prisma: PrismaClient = new PrismaClient(); 

@Injectable()
export class KitchenService {
    async create(km: KitchenModel){
        try {
            const kitchen = await prisma.kitchen.create({
                data: {
                    name: km.name
                }
            })
            return kitchen;
        } catch (error) {
            throw new HttpException("Adatbázis hiba!", HttpStatus.BAD_REQUEST);
        }
    }

    async get(){
        try {
            const kitchens = await prisma.kitchen.findMany();
            return kitchens;
        } catch (error) {
            throw new HttpException("Adatbázis hiba!", HttpStatus.BAD_REQUEST);
        }
    }

    async getOne(id: number){
        try {
            const kitchen = await prisma.kitchen.findFirst({
                where: {
                    id: id
                }
            })

            return kitchen;
        } catch (error) {
            throw new HttpException("Adatbázis hiba!", HttpStatus.BAD_REQUEST);
        }
    }

    async update(km: KitchenModel, id: number){
        try {
            const kitchen = await prisma.kitchen.update({
                where: {
                    id: id
                },
                data: {
                    name: km.name
                }
            })

            return kitchen;
        } catch (error) {
            throw new HttpException("Adatbázis hiba!", HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: number){
        try {
            const kitchen = await prisma.kitchen.delete({
                where: {
                    id: id
                }
            })

            return kitchen;
        } catch (error) {
            throw new HttpException("Adatbázis hiba!", HttpStatus.BAD_REQUEST);
        }
    }
}
