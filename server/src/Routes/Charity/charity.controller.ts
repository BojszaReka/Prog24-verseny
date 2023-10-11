/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CharityService } from './charity.service';
import { CharityModel, UpdateCharityModel } from 'src/Models/Charity.model';
import { AuthGuard } from '../Auth/auth.guard';
import { Role } from 'src/Enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import e from 'express';
import { CharityCSVModel } from 'src/Models/CharityCSV.model';


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

        @Post('upload')
        @UseGuards(new AuthGuard(Role.CHARITY))
        @UseInterceptors(FileInterceptor('file', {
          storage: diskStorage({
            destination: './uploadedFiles/csv'
          })
        }))
        async uploadCSV(@UploadedFile() file: Express.Multer.File, @Req() req) {
          return await this.CharityService.uploadCSV(file, req);
        }

        
}
