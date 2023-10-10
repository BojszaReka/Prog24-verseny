import { AllergenModule } from './Routes/Allergen/allergen.module';
import { FoodsaverModule } from './Routes/Foodsaver/foodsaver.module';
import { CharityModule } from './Routes/Charity/charity.module';
import { FoodOffererModule } from './Routes/Foodofferer/foodofferer.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './PrismaConfig/PrismaService';
import { AuthModule } from './Routes/Auth/auth.module';

@Module({
      imports: [
            AllergenModule,
            CharityModule,
            FoodOffererModule,
            FoodsaverModule,
            AuthModule],
      controllers: [
            AppController],
      providers: [
            AppService, PrismaService],

})
export class AppModule { }
