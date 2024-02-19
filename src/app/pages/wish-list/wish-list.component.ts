import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { WishListService } from 'src/app/services/wish-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  productsArray: Product[] = [];
  productsCount: number = 0;
  constructor(private _wishListService: WishListService) {}
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._wishListService.getLoggedUserWishList().subscribe({
      next: (data) => {
        if (data.status == 'success') {
          this.productsArray = data.data;
          this.productsCount = data.count;
        }
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeProduct(id: string) {
    this._wishListService.removeItem(id).subscribe({
      next: (data) => {
        if (data.status == 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1300,
          });
          this.productsArray = this.productsArray.filter((product) =>
            data.data.includes(product._id)
          );
        }
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
