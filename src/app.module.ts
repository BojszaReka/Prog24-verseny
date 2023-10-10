import { AllergenModule } from './Routes/Allergen/allergen.module';
import { AllergenController } from './Routes/Allergen/allergen.controller';
import { CharityModule } from './Routes/Charity/charity.module';
import { CharityService } from './Routes/Charity/charity.service';
import { CharityController } from './Routes/Charity/charity.controller';
import { FoodOffererController } from './Routes/Foodofferer/foodofferer.controller';
import { FoodOffererModule } from './Routes/Foodofferer/foodofferer.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './PrismaConfig/PrismaService';

@Module({
  imports: [
        AllergenModule, 
        CharityModule, 
    FoodOffererModule,],
  controllers: [ 
        AppController],
  providers: [
        AppService, PrismaService],
})
export class AppModule { }
