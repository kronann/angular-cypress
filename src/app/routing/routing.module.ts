import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from '../home/home.component';
import {BasketComponent} from '../basket/basket.component';
import {RouterModule, Routes} from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'confirmation', component: ConfirmationComponent},
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
