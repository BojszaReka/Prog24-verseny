import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FoodoffererService } from './foodofferer.service';
import { FoodOffererModel, UpdateFoodOffererModel } from 'src/Models/FoodOfferer.model';

@Controller("/foodofferer")
export class FoodOffererController {
    constructor(private readonly foodoffereService: FoodoffererService) { }

    @Post('/create')
    async create(@Body() fo: FoodOffererModel) {
        return await this.foodoffereService.create(fo);
    }

    @Get('/get')
    async get() {
        return await this.foodoffereService.get();
    }

    @Get('/get/:id')
    async getOne(@Param('id') id: string) {
        return await this.foodoffereService.getOne(parseInt(id));
    }

    @Put('/update/:id')
    async update(@Param('id') id: string, @Body() fo: UpdateFoodOffererModel) {
        return await this.foodoffereService.update(parseInt(id), fo);
    }


}
