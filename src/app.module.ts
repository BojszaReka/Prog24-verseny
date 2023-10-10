import { FoodOffererController } from './Routes/Foodofferer/foodofferer.controller';
import { FoodOffererModule } from './Routes/Foodofferer/foodofferer.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './PrismaConfig/PrismaService';

@Module({
  imports: [
    FoodOffererModule,],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
