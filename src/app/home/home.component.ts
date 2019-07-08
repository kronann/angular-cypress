import {Component, Inject, OnInit} from '@angular/core';

import {Product} from '../model/product';
import {Select, Store} from "@ngxs/store";
import {Observable} from 'rxjs/index';
import {ProductState, ProductStateModel} from '../shared/product.state';
import {GetProducts} from '../shared/product.action';
import {AddProductToBasket, GetBasket} from '../shared/basket.action';
import {BasketState, BasketStateModel} from '../shared/basket.state';
import {map} from "rxjs/internal/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Select(ProductState.products)
  private eStoreProducts$: Observable<ProductStateModel>;
  @Select(BasketState.products)
  private basketProducts$: Observable<BasketStateModel>;

  private total$: Observable<any>;

  constructor(private store: Store,
              @Inject('welcomeMsg') public title: string) {
  }

  ngOnInit() {
    this.store.dispatch([new GetProducts(), new GetBasket()]);
    this.total$ = this.getTotal();
  }

  addProduct(event) {
    this.store.dispatch([
      new AddProductToBasket(event)
      // , new DecreaseStockProduct(event)
    ]);
  }

  isAvailable(product: Product): boolean {
    return product.stock > 0;
  }

  getTotal() {
    return this.basketProducts$.pipe(
      map((p: Product[]) => p.reduce((current, next) => current + next.price, 0)));
  }
}
