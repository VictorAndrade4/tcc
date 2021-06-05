import { Injectable } from '@angular/core';
import { Observable, Observer, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../utils/base.service';

@Injectable({
  providedIn: 'root',
})
export class DataService extends BaseService {
  private selectedState: string = '';
  state$: Subject<string> = new Subject();

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getStateObservable() {
    return this.state$.asObservable();
  }

  set state(state: string) {
    this.selectedState = state;
    this.state$.next(this.selectedState);
  }

  getCityOptions(uf: string) {
    if (!uf) return of(['Escolha o Estado']);
    return this.get<Array<string>>(`/cobertura/cities?uf=${uf}`);
  }
}