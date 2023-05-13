import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dtos/create-product.dto';
import { DeleteProductDTO } from './dtos/delete-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {
    console.log('ProductRepository constructor');
  }

  async addProduct(dto: CreateProductDTO) {
    const id = Date.now().toString();
    const query = `CREATE (p: PRODUCT {id: $id ,title: $title, price: $price, description: $description, quantity: $quantity, outOfStock: $outOfStock}) RETURN p`;
    const params = { id, ...dto };
    const result = await this.productRepository.addNode(query, params);
    console.log(result);
    return id;
  }

  async deleteProduct(dto: DeleteProductDTO) {
    const params = { ...dto };
    const query = `MATCH (p:PRODUCT {id: $id}) DELETE p`;
    const result = await this.productRepository.deleteNode(query, params);
    console.log(result);
    return result;
  }

  async getAllProduct() {
    const query = `MATCH (p:PRODUCT) RETURN p LIMIT 25`;
    const result = await this.productRepository.getNodes(query);
    return result.records.map((record) => record.get('p').properties);
  }
}
