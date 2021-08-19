import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from 'app/services/transactions.service';
import { PaymentChannelArr, PaymentChannel, Payment, PaymentType } from "../../@core/data/payment";


@Component({
  selector: 'deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

  depositForm: FormGroup
  amountConfirmed = false
  pca = PaymentChannelArr
  depositInfo = ''
  loading = false
  paymentConfirmed = false
  userId = 'stw26gw727w2y7eer3'
  constructor(
    private fb: FormBuilder,
    private transactionS: TransactionsService
  ) { }

  ngOnInit(): void {
    this.depositForm = this.fb.group({
      amount: ['', Validators.required],
      channel: ['', Validators.required]
    })
  }

  confirmAmount() {
    this.amountConfirmed = true
  }

  changeDepositInfo() {
    this.depositInfo = ''
    let opt = this.depositForm.value['channel']
    switch (opt) {
      case 'Bitcoin':
        this.depositInfo = 'sudsuw-dbwbe2-ewjj2-iwwi23-cwib5'
        break;
      default:
        break;
    }
  }

  makePayment() {
    this.loading = true
    setTimeout(() => {
      this.loading = false
      const { amount, channel } = this.depositForm.value
      const payment = new Payment(this.userId, amount, channel, PaymentType.DEPOSIT)
      this.transactionS.makeDeposit(payment.paymentInfo)
      this.paymentConfirmed = true
    }, 2000);
  }

}
