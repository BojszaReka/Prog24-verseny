import { IsBoolean, IsNotEmpty } from "class-validator"

export class FoodModel{
  @IsNotEmpty()
  name            : string
  @IsNotEmpty()
  type            : string    
  @IsNotEmpty()
  expiration_date : Date
  @IsNotEmpty()
  istakeway       : boolean
  @IsNotEmpty()
  isavailable     : boolean
  @IsNotEmpty()
  kitchenId       : number
  @IsNotEmpty()
  food_offererId  : number
  @IsNotEmpty()
  allergens
}