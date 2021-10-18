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
  private areasFromCity: Array<AreaModel> = [];
  private selectedAreas: Array<AreaModel> = [];

  panelOpenState = false;
  apiLoaded: Observable<boolean>;
  isLoading = false;
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
      this.isLoading = false;
      this.panelOpenState = true;
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

    map?.data.addListener('click', (event) => {
      console.log(event.feature.getProperty('Name'));
      event.feature.setProperty('isColorful', true);
      this.handleKmlClick(event);
    });
  }

  private handleKmlClick(event: any) {
    const selectedSectorCode = event.feature.getProperty('Name');

    const areaAlreadyAdded = this.selectedAreas.some(
      (area) => area.sectorCode == selectedSectorCode
    );

    if (!areaAlreadyAdded) {
      const areaAdded = this.areasFromCity.find(
        (area) => area.sectorCode == selectedSectorCode
      );

      if (areaAdded) {
        this.selectedAreas.push(areaAdded);
      } else {
        const areaNotMappedByAnatel = {
          neighborhood: 'Esta área não possui registros ANATEL',
          sectorCode: selectedSectorCode,
          sectorType: 'Desconhecido',
        } as AreaModel;
        this.selectedAreas.push(areaNotMappedByAnatel);
      }
      this.mapService.getSelectedArea$().next(this.selectedAreas);
    }
  }

  private loadGeoJsonMap(layerUrl: string) {
    map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      this.options
    );

    map.data.loadGeoJson(layerUrl);
  }

  private async onCityChange() {
    this.areasFromCity = await this.dataService.getAreasFromCity();
    this.selectedAreas = [];

    const filePath = await this.dataService.getKmlFileUrl();
    this.startNewMap(filePath);
  }
}
