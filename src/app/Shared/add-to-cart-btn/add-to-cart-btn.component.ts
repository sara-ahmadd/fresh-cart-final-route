import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-to-cart-btn',
  templateUrl: './add-to-cart-btn.component.html',
  styleUrls: ['./add-to-cart-btn.component.css'],
})
export class AddToCartBtnComponent {
  @Input() page: string = '';
  @Input() productId: string = '';
  constructor(private _cartService: CartService) {}

  addProductToCart() {
    this._cartService.addToCart(this.productId).subscribe({
      next: (data) => {
        if (data.status == 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 2000,
          });
        }
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
