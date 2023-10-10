import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FoodOffererModel } from 'src/Models/FoodOfferer.model';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class FoodoffererService {


    async create(fo: FoodOffererModel) {
        try {
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
        } catch (error) {
        }
    }

}
