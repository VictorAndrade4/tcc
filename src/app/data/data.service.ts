import { Injectable } from '@angular/core';
import { Observable, Observer, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private selectedState: string = '';
  state$: Subject<string> = new Subject();

  getStateObservable() {
    return this.state$.asObservable();
  }

  set state(state: string) {
    this.state$.next(this.selectedState);
    this.selectedState = state;
  }

  isStateSet() {
    return this.selectedState != null;
  }

  getCityOptions() {
    return of(['Ouro Branco', 'Belo Horizonte']);
  }
}
