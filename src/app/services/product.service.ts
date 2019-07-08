import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../model/product';


@Injectable()
export class ProductService {

  private API_URL = 'http://localhost:8080/rest/';

  constructor(
    private http: HttpClient
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL + 'products');
  }

  isTheLast(product: Product): boolean {
    return product.stock === 1;
  }

  isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }

  decreaseStock(product: Product) {
    product.stock -= 1;
  }

}
