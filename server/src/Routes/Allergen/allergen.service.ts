/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { AllergenModel } from 'src/Models/Allergen.model';
import { PrismaClient } from '@prisma/client';
import { IsExistsException } from 'src/Exceptions/isexists.exception';

const prisma: PrismaClient = new PrismaClient();

@Injectable()
export class AllergenService {
    async create(a: AllergenModel){
        try {
            const isExists =
            await prisma.allergen.findFirst({ where: { name: a.name } })
            if(isExists){
                throw new IsExistsException();
            }

            const al: AllergenModel = await prisma.allergen.create({
                data: {
                    name: a.name
                }
            })
            return a

        } catch (error) {
            if(error instanceof IsExistsException){
                throw new IsExistsException();
            }
            throw new Error("Adatbázis hiba!");
        }
    }

    async get(){
        try {
            const al: Array<any> = await prisma.allergen.findMany({
                select: {
                    id: true,
                    name: true
                }
            });
            return al
        } catch (error) {
            throw new Error("Adatbázis hiba!");
        }
    }

    async update(al: AllergenModel, id: number){
        try {
            const a: AllergenModel = await prisma.allergen.update({
                where: {
                    id: id
                },
                data: {
                    name: al.name
                }
            });
            return a;
        } catch (error) {
            throw new Error("Adatbázis hiba!");
        }
    }

    async delete(id: number){
        try {
            const al: AllergenModel = await prisma.allergen.delete({
                where: {
                    id: id
                }
            })
            return al;
        } catch (error) {
            throw new Error("Adatbázis hiba!");
        }
    }

}
