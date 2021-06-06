import { Injectable } from '@angular/core';
import { Observable, Observer, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../utils/base.service';

export interface AreaDto {
  neighborhood: string;
  sectorCode: string;
  sectorType: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService extends BaseService {
  private selectedState: string = '';
  private selectedCity: string = '';
  state$: Subject<string> = new Subject();
  city$: Subject<string> = new Subject();

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getStateObservable() {
    return this.state$.asObservable();
  }

  getCityObservable() {
    return this.city$.asObservable();
  }

  set city(newCity: string) {
    this.selectedCity = newCity;
    this.city$.next(this.selectedCity);
  }

  set state(state: string) {
    this.selectedState = state;
    this.state$.next(this.selectedState);
  }

  getCityOptions(uf: string) {
    if (!uf) return of(['Escolha o Estado']);
    return this.get<Array<string>>(`/cobertura/cities?uf=${uf}`);
  }

  getAreasFromCity() {
    return this.get<Array<AreaDto>>(
      `/cobertura/areas?uf=${this.selectedState}&city=${this.selectedCity}`
    ).toPromise();
  }
}
