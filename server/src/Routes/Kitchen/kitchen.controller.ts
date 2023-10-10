/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { KitchenModel } from 'src/Models/Kitchen.model';

@Controller('/kitchen')
export class KitchenController {
    constructor(private readonly KitchenService: KitchenService) { }

    @Post('/create')
    async create(@Body() km: KitchenModel){
        return await this.KitchenService.create(km);
    }

    @Get('/get')
    async get(){
        return await this.KitchenService.get();
    }

    @Get('/get/:id')
    async getOne(@Param('id') id: string){
        return await this.KitchenService.getOne(parseInt(id));
    }

    @Put('/update/:id')
    async update(@Body() km: KitchenModel,@Param('id') id: string){
        return await this.KitchenService.update(km, parseInt(id));
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: string){
        return await this.KitchenService.delete(parseInt(id));
    }
}
