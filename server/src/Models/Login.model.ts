import { IsNotEmpty } from "class-validator";

export class LoginModel {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}

export class LoginResponseModel {
    name: string;
    email: string;
    phone: string;
    token: string;
    roleId: number;
    latitude: number;
    longitude: number;
    locality: string;
}