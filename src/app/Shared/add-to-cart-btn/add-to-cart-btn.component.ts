import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoaderService } from 'src/app/services/loader.service';
import { WishListService } from 'src/app/services/wish-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-to-cart-btn',
  templateUrl: './add-to-cart-btn.component.html',
  styleUrls: ['./add-to-cart-btn.component.css'],
})
export class AddToCartBtnComponent {
  @Input() page: string = '';
  @Input() productId: string = '';
  @Input() removeProduct!: (productId: string) => void;
  constructor(
    private _cartService: CartService,
    private _loader: LoaderService
  ) {}

  addProductToCart() {
    this._loader.show();
    this._cartService.addToCart(this.productId).subscribe({
      next: (data) => {
        console.log(data);
        if (data.status === 'success') {
          this._loader.hide();
          const itemsInCart = data.numOfCartItems;
          this._cartService.setCartItemsCount(itemsInCart);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1200,
          });
        }
      },
      error: (err) => {
        this._loader.hide();
        this._cartService.userToken;
        console.log(err);
      },
    });
  }
}
