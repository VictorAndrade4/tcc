import { Component, OnInit } from '@angular/core';
import { MapService } from '../data/map/map.service';

@Component({
  selector: 'app-appview',
  templateUrl: './appview.component.html',
  styleUrls: ['./appview.component.css'],
})
export class AppviewComponent implements OnInit {
  disableButton = true;
  loading = false;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.getSelectedAreasObservable().subscribe((areas) => {
      this.disableButton = areas.length <= 0;
    });
  }

  clickButtonShow() {
    this.loading = !this.loading;
  }
}
