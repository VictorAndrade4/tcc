import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class BaseService {
  protected baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  protected get<T>(route: string | any[]) {
    const url = this.getRoute(route);
    return this.http.get(url) as Observable<T>;
  }

  protected getFullUrl<T>(route: string) {
    return this.http.get(route) as Observable<T>;
  }

  protected post<T>(route: string, body: any) {
    const url = this.getRoute(route);
    return this.http.post(url, body) as Observable<T>;
  }

  private getRoute(route: string | any[]): string {
    if (!Array.isArray(route)) {
      route = [route];
    }

    return this.baseUrl + route.join('/');
  }
}
