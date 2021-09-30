import { Component, Input, OnInit } from '@angular/core';
import {
  NbDialogRef
} from "@nebular/theme";

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() title: string
  @Input() message: string
  @Input() type: 'error' | 'success'
  constructor(
    public dialogRef: NbDialogRef<MessageComponent>,
  ) { }

  ngOnInit(): void {
  }

}
