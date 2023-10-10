import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FoodsaverService } from './foodsaver.service';
import { FoodSaverModel, UpdateFoodSaverModel } from 'src/Models/FoodSaver.model';

@Controller('/foodsaver')
export class FoodsaverController {
    constructor(private readonly foodsaverService: FoodsaverService) { }

    @Post('/create')
    async create(@Body() fs: FoodSaverModel) {
        return await this.foodsaverService.create(fs);
    }

    @Get('/get')
    async get() {
        return await this.foodsaverService.get();
    }

    @Get('/get/:id')
    async getOne(@Param('id') id: string) {
        return await this.foodsaverService.getOne(parseInt(id));
    }

    @Put('/update/:id')
    async update(@Param('id') id: string, @Body() fs: UpdateFoodSaverModel) {
        return await this.foodsaverService.update(parseInt(id), fs);
    }

}
