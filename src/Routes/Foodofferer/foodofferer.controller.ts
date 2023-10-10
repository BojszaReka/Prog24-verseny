import { Body, Controller, Post } from '@nestjs/common';
import { FoodoffererService } from './foodofferer.service';
import { FoodOffererModel } from 'src/Models/FoodOfferer.model';

@Controller("/foodofferer")
export class FoodOffererController {
    constructor(private readonly foodoffereService: FoodoffererService) { }

    @Post('/create')
    async create(@Body() fo: FoodOffererModel) {
        return await this.foodoffereService.create(fo);
    }

}
