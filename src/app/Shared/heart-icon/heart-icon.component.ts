import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WishListService } from 'src/app/services/wish-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heart-icon',
  templateUrl: './heart-icon.component.html',
  styleUrls: ['./heart-icon.component.css'],
})
export class HeartIconComponent {
  @Input() page: string = '';
  @Input() prodId: string = '';
  successMsg: string = '';
  constructor(private _wishListService: WishListService) {}
  addProductToWishList(id: string) {
    this._wishListService.addToWishList(id).subscribe({
      next: (data) => {
        if (data.status == 'success') {
          this.successMsg = data.message;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1200,
          });
          console.log(data);
        }
      },
    });
  }
}
