import { Neo4jService } from '@dbc-tech/nest-neo4j';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly neo4jService: Neo4jService,
    @Inject('PAYMENT_SERVICE') private paymentClientMS: ClientProxy,
  ) {
    try {
      this.paymentClientMS.connect(); //lazy loaded method to connect to the microservices
    } catch (error) {
      console.error(error);
    }
  }

  async create(createOrderDto: CreateOrderDto) {
    const query = `CREATE (o: Order {id: $id, userId: $userId, productIds: $productIds, orderDate: $orderDate, orderStatus: $orderStatus, orderTotal: $orderTotal, orderAddress: $orderAddress}) RETURN o`;
    const params = {
      id: Date.now().toString(),
      ...createOrderDto,
    };
    const result = await this.neo4jService.write(query, params);
    // console.log(result);
    // this.paymentClientMS.send(pattern, payload);
    this.paymentClientMS
      .send(
        {
          cmd: 'makeUPIPayment',
        },
        {
          orderId: params.id,
          orderTotal: params.orderTotal,
        },
      )
      .subscribe((res) => {
        console.log(res);
      });
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
