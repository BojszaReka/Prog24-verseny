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
            throw new HttpException("Adatbázis hiba!", HttpStatus.BAD_REQUEST);
        }
    }

    async getBySearch(req: any){
        try {
            const foods = await prisma.food.findMany({
                include: {
                    allergens: true,
                    kitchen_type: true
                }
            })

            let array: Array<any> = [];
        for (let index = 0; index < foods.length; index++) {
            const element = foods[index];
            const foodofferers = await prisma.food_offerer.findFirst({
                where: {
                    id: element.food_offererId
                },
                select: {
                    latitude: true,
                    longitude: true
                }
            }) 
            let indexOfFood = foods[index].id
            let alma = Promise.resolve(this.distanceCalculation(foodofferers.latitude, foodofferers.longitude, req.user.latitude, req.user.longitude))
            alma.then(value => {
                array.push({"id": indexOfFood, "distance": value})
            })
        }
        return {array}
            
        } catch (error) {
            throw new HttpException("Adatbázis hiba!", HttpStatus.BAD_REQUEST);
        }
        
    }

    async get(req: any){
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

    calc(req: any, foods: Array<any>){
        
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

    
    private async distanceCalculation(lat1: number, lng1: number, lat2: number, lng2: number) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // this.deg2rad below
        var dLon = this.deg2rad(lng2-lng1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      deg2rad(deg) {
        return deg * (Math.PI/180)
      }

      
         
}
