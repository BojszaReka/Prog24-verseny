import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Food, PrismaClient } from '@prisma/client';
import moment from 'moment';
import { FoodModel } from 'src/Models/Food.model';
const prisma: PrismaClient = new PrismaClient();


@Injectable()
export class FoodService {
    async create(fm: FoodModel){
        try {
            const food = await prisma.food.create({
                data: {
                    name: fm.name,
                    type: fm.type,
                    expiration_date: fm.expiration_date,
                    istakeway: Boolean(fm.istakeway),
                    isavailable: Boolean(fm.isavailable),
                    kitchenId: fm.kitchenId,
                    allergens: fm.allergens,
                    food_offererId: fm.food_offererId
                }
            })
            
            return food;
        } catch (error) {
            console.log(error)
            throw new HttpException("Adatbázis hiba!", HttpStatus.BAD_REQUEST);
        }
    }

    async get(){
        try {
            const foods = await prisma.food.findMany({
                include: {
                    allergens: true,
                    kitchen_type: true
                }
            })

            return foods;
        } catch (error) {
            throw new HttpException("Adatbázis hiba!", HttpStatus.BAD_REQUEST);
        }
    }

    async update(fm: FoodModel, id: number){
        try {
            const food = await prisma.food.update({
                where: {
                    id: id
                },
                data: {
                    name: fm.name,
                    type: fm.type,
                    expiration_date: fm.expiration_date,
                    istakeway: Boolean(fm.istakeway),
                    isavailable: Boolean(fm.isavailable),
                    kitchenId: fm.kitchenId,
                    allergens: fm.allergens,
                    food_offererId: fm.food_offererId
                }
            })

            return food;
        } catch (error) {
            throw new HttpException("Adatbázis hiba!", HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: number){
        try {
            const food = await prisma.food.delete({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new HttpException("Adatbázis hiba!", HttpStatus.BAD_REQUEST);
        }
    }
}
