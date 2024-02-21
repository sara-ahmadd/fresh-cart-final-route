import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CheckOutService } from 'src/app/services/check-out.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  userid: string = localStorage.getItem('userId') ?? '';
  constructor(
    private _checkOutService: CheckOutService,
    private _loader: LoaderService
  ) {}
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this._loader.show();
    this._checkOutService.getAllOrders(this.userid).subscribe({
      next: (data) => {
        this._loader.hide();
        // console.log(data);
        this.orders = data.reverse();
      },
      error: (err) => {
        this._loader.hide();
        // console.log(this.userid);
        console.log(err);
      },
    });
  }
}
