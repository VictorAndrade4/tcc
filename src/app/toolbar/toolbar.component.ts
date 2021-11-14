import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MsgDialogComponent } from '../msg-dialog/msg-dialog.component';
import { GeolocationService } from './geolocation.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    private geolocationService: GeolocationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  clickLocation() {
    this.geolocationService.getUserLocation((state: string, city: string) => {
      this.dialog.open(MsgDialogComponent, {
        data: {
          title: 'Localização atualizada',
          msg: `Sua cidade é ${city} - ${state}`,
        },
      });
    });
  }
}
