import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BuysComponent} from './buys.component';
import {BuysListComponent} from './buys-list/buys-list.component';
import {BuyEditComponent} from './buy-edit/buy-edit.component';

const routes: Routes = [
  {
    path: '',
    component: BuysComponent,
    children: [
      {
        path: '',
        component: BuysListComponent,
      },
      {
        path: 'buy',
        component: BuyEditComponent,
      },
      {
        path: 'buy/:id',
        component: BuyEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuysRoutingModule { }
