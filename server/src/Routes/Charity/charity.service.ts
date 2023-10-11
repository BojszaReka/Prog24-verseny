import { Injectable } from '@nestjs/common';
import { CharityModel, UpdateCharityModel } from 'src/Models/Charity.model';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { IsExistsRegistartionException } from 'src/Exceptions/isexistsregistartion.exception';
import { IsNotExistsException } from 'src/Exceptions/isnotexists.exception';
import { CharityCSVModel } from 'src/Models/CharityCSV.model';
const fs = require("fs");

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

    async uploadCSV(file: Express.Multer.File, req: any){
        let csv = fs.readFileSync(file.path)
        let csvString = csv.toString();
        var lines = csvString.split("\n");

        var result = [];
    
        var headers = lines[1].split(",");
    
        for (var i = 2; i < lines.length-1; i++) {
    
            var obj = {};
            var currentline = lines[i].split(",");
    
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
    
            result.push(obj);
    
        }
        let element: Array<any> = [];
        for (let index = 0; index < result.length; index++) {
             element.push((JSON.stringify(result[index])).split(":")[1]);
             
        }
        let modifiedArray: Array<any> = [];
        for (let indexT = 0; indexT < element.length; indexT++) {
             element[indexT] = (element[indexT]).replace(String.fromCharCode(92),"");
             element[indexT] = (element[indexT]).slice(1,-3);
        }
        let AllergyArray: Array<any> = [];
        for (let indexX = 0; indexX < element.length; indexX++) {
            const json = element[indexX].split(";")
            const CharityMember: CharityCSVModel = new CharityCSVModel;
            AllergyArray = []
            CharityMember.name = json[0];
            CharityMember.locality = json[1];
            CharityMember.birth_date = parseInt(json[2]);
            json[3] === "1" ? AllergyArray.push(JSON.parse('{ "name": "cukorbeteg1"}')) : null
            json[3] === "2" ? AllergyArray.push(JSON.parse('{ "name": "cukorbeteg2"}')) : null
            json[3] === "3" ? AllergyArray.push(JSON.parse('{ "name": "cukorbeteg3"}')) : null
            json[4] === "X" ? AllergyArray.push(JSON.parse('{ "name": "mogyoró"}')) : null
            json[5] === "X" ? AllergyArray.push(JSON.parse('{ "name": "hal"}')) : null
            json[6] === "X" ? AllergyArray.push(JSON.parse('{ "name": "szója"}')) : null
            json[7] === "X" ? AllergyArray.push(JSON.parse('{ "name": "tojás"}')) : null
            json[8] === "X" ? AllergyArray.push(JSON.parse('{ "name": "laktóz"}')) : null
            json[9] === "X" ? AllergyArray.push(JSON.parse('{ "name": "glutén"}')) : null
            await prisma.member.create({
                data: {
                    name: CharityMember.name,
                    birthyear: CharityMember.birth_date,
                    locality: CharityMember.locality,
                    charityId: req.user.id,
                    allergens: {
                        createMany: {
                            data: AllergyArray
                        }
                    }
                }
            })
            
        }
        let stringArray: Array<any> = [];
        for (let indexJ = 0; indexJ < element.length; indexJ++) {
             stringArray.push(element[indexJ]);
        }
    
        //return result; //JavaScript object
        return {message: "Success"}; 
        /*return {
        path: file.path,
        filename: file.originalname,
        mimetype: file.mimetype
      };*/
    }
}
