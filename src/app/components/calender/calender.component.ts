import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {

  constructor(
    private dialogRef: NbDialogRef<CalenderComponent>,
  ) { }

  ngOnInit(): void {
  }

  handleDateChange(e) {
    this.dialogRef.close(e)
  }
}
