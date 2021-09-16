import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';


@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() message: string;

  constructor(
    public dialogRef: NbDialogRef<ConfirmDialogComponent>
  ) { }


  ngOnInit(): void {
  }

  closeD(bool: boolean) {
    console.log(bool)
    this.dialogRef.close(bool)
  }



}
