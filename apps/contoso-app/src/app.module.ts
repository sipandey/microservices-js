import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { Neo4jModule } from '@dbc-tech/nest-neo4j';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ProductModule,
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: '6ca43226.databases.neo4j.io',
      port: 7687,
      username: 'neo4j',
      password: 'al_m-EHRZASPivN3neXL-hbEKhr2Tl2y2p-uprHLHo4',
    }),
    OrderModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
