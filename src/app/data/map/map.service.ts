import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { BaseService } from 'src/app/utils/base.service';
import { GOOGLE_API_KEY } from 'src/app/utils/const';
import { catchError, map } from 'rxjs/operators';
import { AreaModel } from '../data.service';

@Injectable({
  providedIn: 'root',
})
export class MapService extends BaseService {
  private selectedAreas$: Subject<string[]> = new Subject();

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  getSelectedArea$() {
    return this.selectedAreas$;
  }

  getSelectedAreasObservable() {
    return this.selectedAreas$.asObservable();
  }

  googleMapsApiLoaded() {
    return this.httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_API_KEY,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}
