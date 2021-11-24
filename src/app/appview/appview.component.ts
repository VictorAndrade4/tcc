import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { MapService } from '../data/map/map.service';
import { FuzzyInputModel } from '../utils/models';

@Component({
  selector: 'app-appview',
  templateUrl: './appview.component.html',
  styleUrls: ['./appview.component.css'],
})
export class AppviewComponent implements OnInit {
  disableButton = true;
  loading = false;
  city = '';
  state = '';
  areas = [] as string[];

  constructor(
    private mapService: MapService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.mapService.getSelectedAreasObservable().subscribe((areas) => {
      this.disableButton = areas.length <= 0;
      this.areas = areas;
    });

    this.dataService.getCityObservable().subscribe((city) => {
      this.city = city;
    });

    this.dataService.getStateObservable().subscribe((state) => {
      this.state = state;
    });
  }

  clickButtonShow() {
    this.loading = true;

    const model = {
      selectedAreas: this.areas,
      city: this.city,
      state: this.state,
    } as FuzzyInputModel;

    // call this.dataService to POST to API with this info

    this.loading = false;
  }
}
