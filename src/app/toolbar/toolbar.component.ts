import { Component, OnInit } from '@angular/core';
import { GeolocationService } from './geolocation.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  constructor(private geolocationService: GeolocationService) {}

  ngOnInit(): void {}

  clickLocation() {
    this.geolocationService.getUserLocation();
  }
}
