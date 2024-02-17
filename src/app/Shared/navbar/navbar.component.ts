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
  cartItemsQuantity!: number;
  constructor(
    private _authService: AuthService,
    private _cartService: CartService
  ) {
    _authService.userToken.subscribe({
      next: () => {
        const token = this._authService.userToken.getValue();
        if (token.length > 0 && token !== 'null') {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
    });

    _cartService.totalCartItems.subscribe({
      next: () => {
        const itemsCount = this._cartService.totalCartItems.getValue();
        this.cartItemsQuantity = itemsCount;
      },
    });
  }

  signOut() {
    this._authService.signOut();
  }
}
