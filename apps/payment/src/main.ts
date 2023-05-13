import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PaymentModule } from './payment.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  await app.listen(3000);

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   PaymentModule,
  //   {
  //     transport: Transport.TCP,
  //     options: (
  //     host: 'localhost',
  //     port: 3001
  //   )
  //   },
  // );

  // await app.listen();
}
bootstrap();
