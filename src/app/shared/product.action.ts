import {Product} from '../model/product';

export class GetProducts {
  static readonly type = '[PRODUCT] get products';
}

export class GetProduct {
  static readonly type = '[PRODUCT] get product';
  constructor(public payload: Product) {}
}

export class DecreaseStockProduct {
  static readonly type = '[PRODUCT] decrease stock product';
  constructor(public payload: Product) {}
}
