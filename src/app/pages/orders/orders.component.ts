import { Component, OnInit } from '@angular/core';
import { CheckOutService } from 'src/app/services/check-out.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  userid: string = localStorage.getItem('userId') ?? '';
  constructor(private _checkOutService: CheckOutService) {}
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this._checkOutService.getAllOrders(this.userid).subscribe({
      next: (data) => {
        this.orders = data.reverse();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
