/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AllergenService } from './allergen.service';
import { AllergenModel } from 'src/Models/Allergen.model';

@Controller('/allergen')
export class AllergenController { 
    constructor(private readonly AllergenService: AllergenService) { }

    @Post('/create')
    async create(@Body() al: AllergenModel){
        return await this.AllergenService.create(al);
    }

    @Get('/get')
    async get(){
        return await this.AllergenService.get();
    }

    @Put('/update/:id')
    async update(@Body() al: AllergenModel, @Param('id') id: string){
        return await this.AllergenService.update(al, parseInt(id));
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: string){
        return await this.AllergenService.delete(parseInt(id));
    }
}
