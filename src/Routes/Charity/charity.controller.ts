/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CharityService } from './charity.service';
import { CharityModel, UpdateCharityModel } from 'src/Models/Charity.model';

@Controller('/charity')
export class CharityController {
    constructor(private readonly CharityService: CharityService) { }

        @Post('/create')
        async create(@Body() cm: CharityModel){
            return await this.CharityService.create(cm);
        }

        @Get('/get')
        async get(){
            return await this.CharityService.get();
        }

        @Get('/get/:id')
        async getOne(@Param('id') id: string){
            return await this.CharityService.getOne(parseInt(id))
        }

        @Put('/update/:id')
        async update(@Body () cm: UpdateCharityModel, @Param('id') id: string){
            return await this.CharityService.update(cm, parseInt(id))
        }

        
}
