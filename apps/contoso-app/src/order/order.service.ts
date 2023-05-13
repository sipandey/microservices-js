import { Neo4jService } from '@dbc-tech/nest-neo4j';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async create(createOrderDto: CreateOrderDto) {
    const query = `CREATE (o: Order {id: $id, userId: $userId, productIds: $productIds, orderDate: $orderDate, orderStatus: $orderStatus, orderTotal: $orderTotal, orderAddress: $orderAddress}) RETURN o`;
    const params = {
      id: Date.now().toString(),
      ...createOrderDto,
    };
    const result = await this.neo4jService.write(query, params);
    console.log(result);
    return result;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
