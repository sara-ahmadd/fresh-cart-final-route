import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
    this._authService.userToken.subscribe((value) => {
      if (value && value.length > 0 && value !== 'null') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.getUserCart();
    this._cartService.totalCartItems.subscribe(
      (val) => (this.cartItemsQuantity = val)
    );
  }

  checkLoggedUser() {
    this._authService.userToken.subscribe((value) => {
      if (value?.length > 0 && value !== 'null') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
  getUserCart() {
    this._cartService.getLoggedUserCart().subscribe({
      next: (data) => {
        if (data.status == 'success') {
          this._cartService.setCartItemsCount(data.numOfCartItems);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  signOut() {
    this._authService.signOut();
  }
}
