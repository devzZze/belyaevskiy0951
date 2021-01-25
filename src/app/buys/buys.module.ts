import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { BuysRoutingModule } from './buys-routing.module';
import { BuysComponent } from './buys.component';
import { BuysListComponent } from './buys-list/buys-list.component';
import { BuyEditComponent } from './buy-edit/buy-edit.component';


@NgModule({
  declarations: [BuysComponent, BuysListComponent, BuyEditComponent],
  imports: [
    CommonModule,
    BuysRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BuysModule { }
