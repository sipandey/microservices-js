import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { CreateProductDTO } from './dtos/create-product.dto';
import { DeleteProductDTO } from './dtos/delete-product.dto';
import { UpdateProductQtyDTO } from './dtos/update-qty.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post('/add')
  async addProduct(@Body() body: CreateProductDTO) {
    console.log(body);
    return await this.productService.addProduct(body);
  }

  @Get('/getAll')
  async getAllProduct() {
    return await this.productService.getAllProduct();
  }

  @Delete('/delete')
  async deleteProduct(@Body() body: DeleteProductDTO) {
    return await this.productService.deleteProduct(body);
  }

  @Post('/updateQty')
  updateProductQty(@Body() body: UpdateProductQtyDTO) {}
}
