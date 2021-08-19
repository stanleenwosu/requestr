import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentChannelArr } from "../../@core/data/payment";

@Component({
  selector: 'withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss']
})
export class WithdrawalComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  pta = PaymentChannelArr
  loading = false
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.firstForm = this.fb.group({
      amount: ['', Validators.required],
    })

    this.secondForm = this.fb.group({
      paymentType: ['', Validators.required],
      paymentDetails: ['', Validators.required]
    })

    this.thirdForm = this.fb.group({
      password: ['', Validators.required],
    })
  }

  requestWithdrawal() {
    setTimeout(() => {
      this.loading = true
    }, 2000);
  }
}
