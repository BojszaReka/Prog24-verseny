import { IsNotEmpty, IsNumber } from 'class-validator';
export class CharityModel{
    @IsNotEmpty()
    email    : string
    @IsNotEmpty()
    password : string
    @IsNotEmpty()
    phone    : string
    @IsNotEmpty()
    name     : string
    @IsNotEmpty()
    @IsNumber()
    roleId   : number
    @IsNotEmpty()
    @IsNumber()
    zipcode  : number 
    @IsNotEmpty()
    locality : string
    @IsNotEmpty()
    address  : string
    @IsNotEmpty()
    latitude : number 
    @IsNotEmpty()
    longitude: number
}

export class UpdateCharityModel{
    @IsNotEmpty()
    email    : string
    @IsNotEmpty()
    phone    : string
    @IsNotEmpty()
    name     : string
    @IsNotEmpty()
    @IsNumber()
    roleId   : number
    @IsNotEmpty()
    @IsNumber()
    zipcode  : number 
    @IsNotEmpty()
    locality : string
    @IsNotEmpty()
    address  : string
    @IsNotEmpty()
    latitude : number 
    @IsNotEmpty()
    longitude: number
}