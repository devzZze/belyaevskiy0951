import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Buy, BuyStatus} from 'src/app/shared/models/buy.model';
import {FormGroup, FormControl, Validators, NgModel} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import {BuysService} from 'src/app/shared/services/buys.service';


@Component({
  selector: 'app-buy-edit',
  templateUrl: './buy-edit.component.html',
  styleUrls: ['./buy-edit.component.css']
})
export class BuyEditComponent implements OnInit {
  id: number;
  buy: Buy;
  buyForm: FormGroup;
  BuyStatus = BuyStatus;

  constructor(
    private activatedRouter: ActivatedRoute,
    private buysService: BuysService,
    private router: Router
  ) {
    this.activatedRouter.params.subscribe((param) => {
      this.id = param.id;
    });
  }

  ngOnInit(): void {
    this.buyForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      count: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      status: new FormControl(1,),
    });
    this.getData();
  }

  async getData() {
    if (!isNullOrUndefined(this.id)) {
      try {
        let buy = this.buysService.getOneById(this.id);
        this.buy = await buy;
      } catch (err) {
        console.error(err);
      }
      this.buyForm.patchValue({
        name: this.buy.name,
        count: this.buy.count,
        status: this.buy.status,
      });
    }
  }

  async onSave() {
    if (!isNullOrUndefined(this.id)) {
      try {
        await this.buysService.putOneById(this.id, this.buyForm.value);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        let res = await this.buysService.postOne(this.buyForm.value);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch (err) {
        console.error(err);
      }
    }
    this.router.navigate(['/buys']);
  }

  async onDelete() {
    try {
      await this.buysService.deleteOneById(this.id);
    } catch (err) {
      console.error(err);
    }
    this.router.navigate(['/buys']);
  }
}
