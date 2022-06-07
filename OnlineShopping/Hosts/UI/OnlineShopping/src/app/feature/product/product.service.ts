import { Injectable } from '@angular/core';
import { Client } from 'src/app/api/nswag';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private swaggerClient: Client) { }

  getProducts = () => this.swaggerClient.get();

}
