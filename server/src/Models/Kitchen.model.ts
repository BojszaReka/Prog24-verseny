import { IsNotEmpty } from "class-validator";

export class KitchenModel{
    @IsNotEmpty()    
    name : string
}