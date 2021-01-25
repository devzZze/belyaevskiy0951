import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Buy, BuyStatus} from 'src/app/shared/models/buy.model';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute, Router} from '@angular/router';
import {BuysService} from 'src/app/shared/services/buys.service';

@Component({
  selector: 'app-buys-list',
  templateUrl: './buys-list.component.html',
  styleUrls: ['./buys-list.component.css']
})
export class BuysListComponent implements OnInit {
  buys: Buy[];
  BuyStatus = BuyStatus;

  constructor(private activatedRouter: ActivatedRoute, private buysService: BuysService, private router: Router) {
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      let buys = this.buysService.getAll();
      this.buys = isNullOrUndefined(await buys) ? [] : await buys;
      let topArr = [];
      let bottomArr = [];
      for (let i of this.buys) {
        if (i.status == 1) {
          topArr.push(i);
        } else {
          bottomArr.push(i);
        }
      }
      topArr.sort((prev, next) => {
        if (prev.name < next.name) {
          return -1;
        }
        if (prev.name > next.name) {
          return 1;
        }
      });
      bottomArr.sort((prev, next) => {
        if (prev.name < next.name) {
          return -1;
        }
        if (prev.name > next.name) {
          return 1;
        }
      });
      let goodArr = topArr.concat(bottomArr);
      this.buys = goodArr;
    } catch (err) {
      console.error(err);
    }
  }

  getClass(buy) {
    if (buy.status === 1) {
      return 'green';
    } else {
      return 'white';
    }
  }


  onLinkBuy(id: number) {
    this.router.navigate([this.router.url, 'buy', id]);
  }

  onAddBuy() {
    this.router.navigate([this.router.url, 'buy']);
  }

  async onChangeStatus(id) {
    this.buys.find(index => index.id === id).status = Math.abs(this.buys.find(index => index.id === id).status - 1);
    try {
      await this.buysService.putOneById(id, this.buys.find(index => index.id === id));
    } catch (err) {
      console.error(err);
    }
    this.getData();
  }
}
