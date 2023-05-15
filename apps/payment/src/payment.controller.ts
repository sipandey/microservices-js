import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  getHello(): string {
    return this.paymentService.getHello();
  }

  @MessagePattern({
    cmd: 'makeUPIPayment',
  })
  makeUPIPayment({ orderId, orderTotal }) {
    //todo: initiate switch communication to make payment
    console.log(
      'Received payment request for order ' +
        orderId +
        ' with ' +
        orderTotal +
        '',
    );
    return { status: 'success', message: 'Payment successful' };
  }

  @MessagePattern({ cms: 'makeCardPayment' })
  makeCardPayment() {
    //todo: initiate card payment via master/visa/rpay
    return { status: 'success', message: 'Card payment successful' };
  }

  @EventPattern({ cms: 'makeNetBankingPayment' })
  makeNetBankingPayment() {
    //todo: initiate net-banking payment
  }

  selectPaymentType() {}
}
