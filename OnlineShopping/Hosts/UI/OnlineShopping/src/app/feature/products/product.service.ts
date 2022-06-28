import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductListResponse } from './models/product-list-response.model';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient
  ) { }

  getProducts(): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(`${environment.apiBaseUrl}api/product/get`)
      .pipe(map((prod) => {
        return prod;
      }));
  }

}
