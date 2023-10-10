import { FoodsaverController } from './foodsaver.controller';
import { FoodsaverService } from './foodsaver.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        FoodsaverController,],
    providers: [
        FoodsaverService,],
})
export class FoodsaverModule { }
