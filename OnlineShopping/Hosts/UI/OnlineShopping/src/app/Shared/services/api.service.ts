import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { retry, timeout, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { config } from '../../../assets/config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseUrl: string = environment.apiBaseUrl;
  public loginTimeoutMilliseconds: number = config.loginTimeoutMilliseconds;

  constructor(
    private httpClient: HttpClient
    , private toastr: ToastrService
  ) {
  }

  public POST(url: string, model: object) {
    let fullUrl = this.baseUrl + url;
    let bodyParams = JSON.stringify(model);
    let response = this.httpClient.post<any>(fullUrl, bodyParams)
      .pipe(retry(2), timeout(this.loginTimeoutMilliseconds),
        catchError(e => {
          this.toastr.error(e ? e : "Request to the server timed out.", "Error!");
          return of(null);
        }));
    return response;
  }
}
