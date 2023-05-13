import { IsNotEmpty } from "class-validator";

  
  export class DeleteProductDTO {
    @IsNotEmpty()
    id: string;
  }