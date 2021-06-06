import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { BaseService } from 'src/app/utils/base.service';
import { GOOGLE_API_KEY } from 'src/app/utils/const';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MapService extends BaseService {
  state$: Subject<string> = new Subject();
  city$: Subject<string> = new Subject();

  constructor(private httpClient: HttpClient) {
    super(httpClient);
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
