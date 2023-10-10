import { IsNotEmpty, IsNumber } from "class-validator"

export class FoodSaverModel {
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    password: string
    @IsNotEmpty()
    phone: string
    @IsNotEmpty()
    locality: string
    @IsNotEmpty()
    @IsNumber()
    birthyear: number
    @IsNotEmpty()
    @IsNumber()
    kitchenId: number
    @IsNotEmpty()
    latitude: number
    @IsNotEmpty()
    longitude: number
    allergens
}

export class UpdateFoodSaverModel {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    phone: string;
    @IsNotEmpty()
    locality: string;
    @IsNotEmpty()
    @IsNumber()
    birthyear: number;
    @IsNotEmpty()
    @IsNumber()
    kitchenId: number;
    @IsNotEmpty()
    latitude: number;
    @IsNotEmpty()
    longitude: number;
    allergens;
}