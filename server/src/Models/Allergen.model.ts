import { IsNotEmpty } from "class-validator"

export class AllergenModel{
    @IsNotEmpty()
    name: string
}