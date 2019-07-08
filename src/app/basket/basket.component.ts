import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Product } from '../model/product';
import { Customer } from '../model/customer';
import { CustomerService } from '../services/customer.service';
import {BasketState, BasketStateModel} from '../shared/basket.state';
import {Observable} from 'rxjs/index';
import {Select} from "@ngxs/store";
import {Checkout, GetBasket} from '../shared/basket.action';
import { Store} from "@ngxs/store";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  customer: Customer;

  @Select(BasketState.products)
  private basketProducts$: Observable<BasketStateModel>;

  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch([ new GetBasket()]);
    this.customer = new Customer();
  }

  checkout() {
    this.store.dispatch([ new Checkout(this.customer)]);
  }
}
