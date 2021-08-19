import { Component, OnInit } from '@angular/core';
import { DATA } from '../../@core/data/transaction'
@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  data = DATA
  constructor() { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
