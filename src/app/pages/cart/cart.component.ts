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
  loader: boolean = false;

  constructor(private _cartService: CartService) {}
  ngOnInit(): void {
    this.getUserCart();
  }
  getUserCart() {
    this._cartService.getLoggedUserCart().subscribe({
      next: (data) => {
        if (data.status == 'success') {
          this._cartService.totalCartItems.next(data.numOfCartItems);
          this.cartItems = data.data.products; //products array
          this.totalPrice = data.data.totalCartPrice;
          console.log(data);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateItemCount(id: string, quantity: number) {
    if (quantity == 0) {
      this.removeItem(id);
    } else {
      this.loader = true;
      this._cartService.updateCartItemCount(quantity, id).subscribe({
        next: (data) => {
          if (data.status == 'success') {
            this.loader = false;
            this.cartItems = data.data.products;
            this.totalPrice = data.data.totalCartPrice;
            this._cartService.setCartItemsCount(data.data.numberOfCartItems);

            console.log('data from cartUpdate function', data);
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
          this.cartItems = data.data.products;
          this.totalPrice = data.data.totalCartPrice;

          this._cartService.totalCartItems.next(data.numberOfCartItems);
          console.log(data);
        }
      },
    });
  }
  clearTheCart() {
    this._cartService.clearCart().subscribe({
      next: (data) => {
        if (data.message == 'success') {
          this.cartItems = [];
          this.totalPrice = 0;
          this._cartService.totalCartItems.next(0);
        }
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
