import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  OURO_BRANCO_LNG,
  OURO_BRANCO_LAT,
  GOOGLE_API_KEY,
} from '../utils/const';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  apiLoaded: Observable<boolean>;
  options: google.maps.MapOptions = {
    center: { lat: OURO_BRANCO_LAT, lng: OURO_BRANCO_LNG },
    zoom: 12,
    disableDefaultUI: true,
  };
  kmlPath =
    'https://storage.googleapis.com/tcc-anatel-dados/3145901_Ouro%20Branco_Setores_2020.kml';

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_API_KEY,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  ngOnInit(): void {}
}
