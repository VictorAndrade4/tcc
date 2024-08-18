import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ZOOM } from '../../utils/const';
import { AreaModel, DataService } from '../data.service';
import { MapService } from './map.service';

let map: google.maps.Map;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnInit {
  private selectedAreas: Array<string> = [];

  options: google.maps.MapOptions = {
    center: { lat: DEFAULT_LAT, lng: DEFAULT_LNG },
    zoom: DEFAULT_ZOOM,
    disableDefaultUI: true,
  };
  panelOpenState = false;
  apiLoaded: Observable<boolean>;
  isLoading = false;
  kmlPath = '';

  constructor(
    private dataService: DataService,
    private mapService: MapService
  ) {
    this.apiLoaded = mapService.googleMapsApiLoaded();
  }

  ngOnInit() {
    this.dataService
      .getCityObservable()
      .subscribe(this.onCityChange.bind(this));
    this.isLoading = true;
  }

  ngAfterViewInit() {
    this.apiLoaded.subscribe(() => {
      this.startNewMap(null);
    });
  }

  private startNewMap(layerUrl: string | null) {
    if (layerUrl) {
      this.loadGeoJsonMap(layerUrl);
    }

    map?.data.setStyle((feature) => {
      let color = 'gray';
      if (feature.getProperty('isColorful')) color = 'blue';

      return {
        fillColor: color,
        strokeColor: color,
        strokeWeight: 5,
      };
    });

    map?.data.addListener('click', (event: any) => {
      console.log(event.feature.getProperty('name'));
      event.feature.setProperty('isColorful', true);
      this.handleKmlClick(event);
    });
  }

  private handleKmlClick(event: any) {
    const selectedSectorCode = event.feature.getProperty('name') as string;

    const areaAlreadyAdded = this.selectedAreas.some(
      (area) => area == selectedSectorCode
    );
    if (!areaAlreadyAdded) {
      this.selectedAreas.push(selectedSectorCode);
      this.mapService.getSelectedArea$().next(this.selectedAreas);
    }
  }

  private loadGeoJsonMap(layerUrl: string) {
    map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      this.options
    );

    map.data.loadGeoJson(layerUrl, { idPropertyName: 'Cidade' }, (geo) => {
      this.panelOpenState = true;
      this.isLoading = false;
      let cityLatLang: google.maps.LatLng;

      // move to somewhere nearby the selected city
      geo[0].getGeometry()?.forEachLatLng((latLang) => {
        // we can't get only the first latLng :/ So that's the workarround
        if (!cityLatLang) {
          cityLatLang = latLang;
          map.panTo(cityLatLang);
        }
      });
    });
  }

  private async onCityChange() {
    this.selectedAreas = [];

    const filePath = await this.dataService.getKmlFileUrl();
    this.startNewMap(filePath);
  }
}
