import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: { product: Product; price: number; count: number }[] = [];
  totalPrice: number = 0;

  constructor(
    private _cartService: CartService,
    private _loader: LoaderService
  ) {}
  ngOnInit(): void {
    this.getUserCart();
  }
  getUserCart() {
    this._loader.show();
    this._cartService.getLoggedUserCart().subscribe({
      next: (data) => {
        this._loader.hide();
        if (data.status == 'success') {
          this.cartItems = data.data.products;
          this.totalPrice = data.data.totalCartPrice;
          this._cartService.setCartItemsCount(data.numOfCartItems);
          console.log(data);
        }
      },
      error: (err) => {
        this._loader.hide();
        console.log(err);
      },
    });
  }
  updateItemCount(id: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(id);
    } else {
      this._loader.show();
      this._cartService.updateCartItemCount(quantity, id).subscribe({
        next: (data) => {
          if (data.status == 'success') {
            this._loader.hide();
            this.cartItems = data.data.products;
            this.totalPrice = data.data.totalCartPrice;
            this._cartService.setCartItemsCount(data.numOfCartItems);
          }
        },
        error: (err) => {
          this._loader.hide();
          console.log(err);
        },
      });
    }
  }
  removeItem(id: string) {
    this._loader.show();
    this._cartService.removeItemFromCart(id).subscribe({
      next: (data) => {
        this._loader.hide();
        if (data.status == 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Product removed from your cart successfully',
            showConfirmButton: false,
            timer: 1300,
          });
          this._cartService.setCartItemsCount(data.numOfCartItems);
          this.cartItems = data.data.products;
          this.totalPrice = data.data.totalCartPrice;

          console.log(data);
        }
      },
      error: (err) => {
        this._loader.hide();
        console.log(err);
      },
    });
  }
  clearTheCart() {
    this._loader.show();

    this._cartService.clearCart().subscribe({
      next: (data) => {
        this._loader.hide();
        if (data.message == 'success') {
          this._cartService.setCartItemsCount(0);
          this.cartItems = [];
          this.totalPrice = 0;
        }
        console.log(data);
      },
      error: (err) => {
        this._loader.hide();
        console.log(err);
      },
    });
  }
}
