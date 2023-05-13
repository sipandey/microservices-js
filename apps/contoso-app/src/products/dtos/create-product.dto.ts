import {
  IsString,
  Length,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateProductDTO {
  id?: string;

  @Length(3, 20)
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @Length(3, 100)
  description: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  outOfStock: boolean;

  @IsNumber()
  quantity: number;
}
