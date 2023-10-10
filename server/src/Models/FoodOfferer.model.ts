import { IsNotEmpty, IsNumber } from "class-validator"

export class FoodOffererModel {
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    password: string
    @IsNotEmpty()
    phone: string
    @IsNotEmpty()
    @IsNumber()
    zipcode: number
    @IsNotEmpty()
    locality: string
    @IsNotEmpty()
    address: string
    @IsNotEmpty()
    latitude: number
    @IsNotEmpty()
    longitude: number

}

export class UpdateFoodOffererModel {
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    phone: string
    @IsNotEmpty()
    @IsNumber()
    zipcode: number
    @IsNotEmpty()
    locality: string
    @IsNotEmpty()
    address: string
    @IsNotEmpty()
    latitude: number
    @IsNotEmpty()
    longitude: number
}