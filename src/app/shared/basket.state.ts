import {Product} from '../model/product';
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {CustomerService} from '../services/customer.service';
import {AddProductToBasket, Checkout, CheckoutFailed, CheckoutSuccess, GetBasket} from './basket.action';
import {Router} from '@angular/router';
import {tap} from 'rxjs/internal/operators';
import {DecreaseStockProduct} from './product.action';

export interface BasketStateModel {
  products: Product[];
  status?: 'pending' | 'success' | 'failed';
}

@State<BasketStateModel>({
  name: "basket",
  defaults: {
    products: [] = []
  }
})
export class BasketState {

  constructor(private customerService: CustomerService, private router: Router) {
  }

  @Selector()
  public static products(state: BasketStateModel) {
    return state.products;
  }

  @Action(GetBasket)
  getBasket({patchState}: StateContext<BasketStateModel>) {
    patchState({status: 'pending'});

    return this.customerService.getBasket().pipe(tap(
      products => patchState({products: products, status: 'success'})
    ));
  }

  @Action(AddProductToBasket)
  addProductToBasket({getState, patchState, dispatch}: StateContext<BasketStateModel>, {payload}: AddProductToBasket) {
    patchState({status: 'pending'});

    return this.customerService.addProduct(payload).pipe(tap(
      product => {
        patchState({products: [...getState().products, product], status: 'success'})
        dispatch(new DecreaseStockProduct(product));
      })
    );
  }

  @Action(Checkout)
  checkOut({dispatch, patchState}: StateContext<BasketStateModel>, {payload}: Checkout) {
    patchState({status: 'pending'});

    return this.customerService.checkout(payload).pipe(tap(success => success ? dispatch(CheckoutSuccess) : dispatch(CheckoutFailed)));
  }

  @Action(CheckoutSuccess)
  orderSuccess({patchState}: StateContext<BasketStateModel>) {
    patchState({status: 'success'});
    this.router.navigate(['confirmation'])
  }

  @Action(CheckoutFailed)
  orderFailed({patchState}: StateContext<BasketStateModel>) {
    patchState({status: 'failed'});
  }
}

