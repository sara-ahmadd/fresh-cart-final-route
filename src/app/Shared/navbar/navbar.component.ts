import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  cartItemsQuantity: number = 0;
  constructor(
    private _authService: AuthService,
    private _cartService: CartService
  ) {
    this.checkLoggedUser();
    this._cartService.totalCartItems.subscribe((value) => {
      this.cartItemsQuantity = value;
      console.log(value);
    });
  }

  checkLoggedUser() {
    this._authService.userToken.subscribe((value) => {
      if (value.length > 0 && value !== 'null') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

    // this._authService.userToken.subscribe({
    //   next: () => {
    //     const token = this._authService.userToken.value;
    //     if (token.length > 0 && token !== 'null') {
    //       this.isLoggedIn = true;
    //     } else {
    //       this.isLoggedIn = false;
    //     }
    //   },
    // });
  }
  getCartItemsCount() {
    if (this.isLoggedIn) {
      this._cartService.totalCartItems.subscribe({
        next: () => {
          const items = this._cartService.totalCartItems.value;
          if (items) {
            this.cartItemsQuantity = items;
          }
        },
      });
    }
  }
  signOut() {
    this._authService.signOut();
  }
}
