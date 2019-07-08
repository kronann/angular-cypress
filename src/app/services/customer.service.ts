import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Product} from '../model/product';
import {Customer} from '../model/customer';
import {Store} from "@ngxs/store";
import {map, reduce, tap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private API_URL = 'http://localhost:8080/rest/';
  private total: 0;

  constructor(private http: HttpClient, private store: Store) {
  }

  getBasket(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL + 'basket')
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<Product>(this.API_URL + 'basket', product);
  }

  getTotal(): Observable<number> {
    return this.store.select(store => store.basket.products)
      .pipe(tap( p=> console.log("before ", p )), map(p => p.price),
      reduce((current, next) => current + next, 0),tap( p=> console.log("sum ", p )));
  }

  checkout(customer: Customer): Observable<any> {
    return this.http.post(this.API_URL + 'basket/confirm', customer);
  }
}
