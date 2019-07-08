import {Product} from '../model/product';
import {ProductService} from '../services/product.service';
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {DecreaseStockProduct, GetProduct, GetProducts} from './product.action';
import {tap} from 'rxjs/internal/operators';

export interface ProductStateModel {
  products: Product[];
  status?: 'pending' | 'success' | 'failed';
}

@State<ProductStateModel>({
  name: "product",
  defaults: {
    products: [] = []
  }
})
export class ProductState {

  constructor(private productService: ProductService) {
  }

  @Selector()
  public static products(state: ProductStateModel) {
    return state.products;
  }

  @Action(GetProducts)
  getProducts({patchState}: StateContext<ProductStateModel>) {
    patchState({status: 'pending'});

    return this.productService.getProducts().pipe(tap(
      products => patchState({ products, status: 'success'})
    ));
  }

  @Action(GetProduct)
  getProduct({getState}: StateContext<ProductStateModel>, {payload}: GetProduct) {
    const state = getState();
    return state.products.filter(p => p === payload);
  }

  @Action(DecreaseStockProduct)
  decreaseStock({getState, patchState}: StateContext<ProductStateModel>, {payload}: DecreaseStockProduct) {

    const state = getState();
    const index = state.products.findIndex(p => p.title === payload.title);
    state.products[index] = payload;

    patchState({
      products: [...state.products]
    })
  }
}

