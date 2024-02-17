import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: { product: Product; price: number; count: number }[] = [];
  totalPrice!: number;
  constructor(private _cartService: CartService) {}
  ngOnInit(): void {
    this.getUserCart();
  }
  getUserCart() {
    this._cartService.getLoggedUserCart().subscribe({
      next: (data) => {
        this._cartService.totalCartItems.next(data.numOfCartItems);
        this.cartItems = data.data.products;
        this.totalPrice = data.data.totalCartPrice;

        console.log(data.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
