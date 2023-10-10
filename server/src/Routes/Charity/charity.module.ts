import { Module } from '@nestjs/common';
import { CharityService } from './charity.service';
import { CharityController } from './charity.controller';

@Module({
    imports: [],
    controllers: [CharityController],
    providers: [CharityService],
})
export class CharityModule {}
