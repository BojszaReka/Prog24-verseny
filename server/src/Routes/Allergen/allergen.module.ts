import { AllergenController } from './allergen.controller';
import { AllergenService } from './allergen.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [AllergenController],
    providers: [
        AllergenService, ],
})
export class AllergenModule {}
