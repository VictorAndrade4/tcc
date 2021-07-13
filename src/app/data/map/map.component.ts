import { Component, OnInit } from '@angular/core';
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
export class MapComponent implements OnInit {
  private areasFromCity: Array<AreaModel> = [];
  private selectedAreas: Array<AreaModel> = [];

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
    const selectedSectorCode = event.featureData.name;

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

  ngOnInit(): void {
    this.dataService
      .getCityObservable()
      .subscribe(this.onCityChange.bind(this));
  }

  private async onCityChange() {
    this.areasFromCity = await this.dataService.getAreasFromCity();
    this.selectedAreas = [];

    this.kmlPath = await this.dataService.getKmlFileUrl();
  }
}
