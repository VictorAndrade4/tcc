import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface MsgDialogData {
  title: string;
  msg: string;
}

@Component({
  selector: 'app-msg-dialog',
  templateUrl: './msg-dialog.component.html',
  styleUrls: ['./msg-dialog.component.css'],
})
export class MsgDialogComponent implements OnInit {
  title: string;
  msg: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: MsgDialogData) {
    this.title = data.title;
    this.msg = data.msg;
  }

  ngOnInit(): void {}
}
