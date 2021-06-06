import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ZOOM } from '../../utils/const';
import { DataService } from '../data.service';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  panelOpenState = true;
  apiLoaded: Observable<boolean>;
  options: google.maps.MapOptions = {
    center: { lat: DEFAULT_LAT, lng: DEFAULT_LNG },
    zoom: DEFAULT_ZOOM,
    disableDefaultUI: true,
  };
  kmlPath = '';

  constructor(
    private dataService: DataService,
    private mapService: MapService
  ) {
    this.apiLoaded = mapService.googleMapsApiLoaded();
  }

  handleKmlClick(event: google.maps.KmlMouseEvent) {
    const codigoSetorCensitario = event.featureData.name;
    console.log(codigoSetorCensitario);
  }

  ngOnInit(): void {
    this.dataService.getCityObservable().subscribe(() => {
      this.kmlPath =
        'https://storage.googleapis.com/tcc-anatel-dados/3145901_Ouro%20Branco_Setores_2020.kml';
    });
  }
}
