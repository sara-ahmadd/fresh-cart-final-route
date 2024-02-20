import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { LoaderService } from 'src/app/services/loader.service';
import { WishListService } from 'src/app/services/wish-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heart-icon',
  templateUrl: './heart-icon.component.html',
  styleUrls: ['./heart-icon.component.css'],
})
export class HeartIconComponent {
  @Input() page: string = '';
  @Input() redColor: boolean = false;
  @Input() prodId: string = '';
  successMsg: string = '';
  constructor(
    private _wishListService: WishListService,
    private _loader: LoaderService
  ) {}
  addProductToWishList(id: string) {
    this._loader.show();
    this._wishListService.addToWishList(id).subscribe({
      next: (data) => {
        this._loader.hide();
        if (data.status == 'success') {
          if (this.redColor) {
            Swal.fire({
              position: 'center',
              icon: 'info',
              title: 'Item is already in your wish list.',
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            console.log(data);
            this.successMsg = data.message;
            this.redColor = true;
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      },
      error: (err) => {
        this._loader.hide();
        console.log(err);
      },
    });
  }
}
