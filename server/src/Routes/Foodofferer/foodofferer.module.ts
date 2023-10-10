import { FoodoffererService } from './foodofferer.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { FoodOffererController } from './foodofferer.controller';

@Module({
    imports: [],
    controllers: [FoodOffererController],
    providers: [
        FoodoffererService,],
})
export class FoodOffererModule { }
