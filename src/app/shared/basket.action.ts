import {Product} from '../model/product';
import {Customer} from '../model/customer';

export class Checkout {
  static readonly type = '[BASKET] checkout';
  constructor(public payload : Customer){}
}

export class CheckoutSuccess {
  static readonly type = '[BASKET] checkout success';
}

export class CheckoutFailed {
  static readonly type = '[BASKET] checkout failed';
}

export class GetBasket {
  static readonly type = '[BASKET] get basket';
}

export class AddProductToBasket {
  static readonly type = '[BASKET] add product to basket';
  constructor(public payload : Product){}
}
