import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: { product: Product; price: number; count: number }[] = [];
  totalPrice: number = 0;

  constructor(private _cartService: CartService) {}
  ngOnInit(): void {
    this.getUserCart();
  }
  getUserCart() {
    this._cartService.getLoggedUserCart().subscribe({
      next: (data) => {
        if (data.status == 'success') {
          this.cartItems = data.data.products;
          this.totalPrice = data.data.totalCartPrice;
          this._cartService.setCartItemsCount(data.numOfCartItems);
        }
      },
      error: (err) => {},
    });
  }
  updateItemCount(id: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(id);
    } else {
      this._cartService.updateCartItemCount(quantity, id).subscribe({
        next: (data) => {
          if (data.status == 'success') {
            this.cartItems = data.data.products;
            this.totalPrice = data.data.totalCartPrice;
            this._cartService.setCartItemsCount(data.numOfCartItems);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  removeItem(id: string) {
    this._cartService.removeItemFromCart(id).subscribe({
      next: (data) => {
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
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  clearTheCart() {
    this._cartService.clearCart().subscribe({
      next: (data) => {
        if (data.message == 'success') {
          this._cartService.setCartItemsCount(0);
          this.cartItems = [];
          this.totalPrice = 0;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
