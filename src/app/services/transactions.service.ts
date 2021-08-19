import { Injectable } from '@angular/core';
import { Payment, PaymentInfo, PaymentType } from 'app/@core/data/payment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor() { }

  makeDeposit(paymentInfo: PaymentInfo) {
    console.log(paymentInfo)
    return
  }

  makeWithdrawal(paymentInfo: PaymentInfo) {
    console.log(paymentInfo)
    return
  }

  makeRefund(paymentInfo: PaymentInfo) {
    console.log(paymentInfo)
    return
  }
}

