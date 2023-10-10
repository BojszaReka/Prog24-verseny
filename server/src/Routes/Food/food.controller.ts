/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodModel } from 'src/Models/Food.model';
import { AuthGuard } from '../Auth/auth.guard';
import { Role } from 'src/Enums/role.enum';

@Controller('/food')
export class FoodController {
    constructor(private readonly FoodService: FoodService){ }

    @Post('/create')
    async create(@Body() fm: FoodModel){
        return await this.FoodService.create(fm);
    }
    
    @Get('/get')
    @UseGuards(new AuthGuard(Role.FOOD_SAVER))
    async get(@Req() req){
        return await this.FoodService.get(req);
    }

    @Get('/search')
    @UseGuards(new AuthGuard(Role.FOOD_SAVER))
    async search(@Req() req)
    {
        return await this.FoodService.getBySearch(req)
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
