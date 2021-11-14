import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { BaseService } from '../utils/base.service';
import { State } from 'src/app/utils/models';
import { STATES_LIST } from '../utils/const';

interface Geolocation {
  city: string;
  state: string;
}

@Injectable({
  providedIn: 'root',
})
export class GeolocationService extends BaseService {
  constructor(private dataService: DataService, httpClient: HttpClient) {
    super(httpClient);
  }

  getUserLocation() {
    this.getFullUrl<Geolocation>('https://geolocation-db.com/json/').subscribe(
      (response) => {
        this.dataService.state = this.getStateAcronym(response.state);
        this.dataService.city = response.city;
      }
    );
  }

  get states(): State[] {
    return STATES_LIST;
  }

  private getStateAcronym(stateFullName: string): string {
    const stateAcronym = this.states.find((state) =>
      state.fullname
        .toLocaleLowerCase()
        .includes(stateFullName.toLocaleLowerCase())
    );

    return stateAcronym?.initials as string;
  }
}
