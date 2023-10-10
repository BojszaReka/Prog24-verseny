/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodModel } from 'src/Models/Food.model';
import { flatMap } from 'rxjs';

@Controller('/food')
export class FoodController {
    constructor(private readonly FoodService: FoodService){ }

    @Post('/create')
    async create(@Body() fm: FoodModel){
        return await this.FoodService.create(fm);
    }
    
    @Get('/get')
    async get(){
        return await this.FoodService.get();
    }

    @Put('/update/:id')
    async update(@Body() fm: FoodModel, @Param('id') id: string){
        return await this.FoodService.update(fm,parseInt(id));
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: string){
        return await this.FoodService.delete(parseInt(id));
    }
}
