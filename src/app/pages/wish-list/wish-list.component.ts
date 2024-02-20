import {
  AfterContentChecked,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { LoaderService } from 'src/app/services/loader.service';
import { WishListService } from 'src/app/services/wish-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit, OnDestroy {
  productsArray: Product[] = [];
  productsCount: number = 0;

  cancelGetProducts!: Subscription;
  cancelRemoveProduct!: Subscription;

  constructor(
    private _wishListService: WishListService,
    private _loader: LoaderService
  ) {}
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._loader.show();
    this.cancelGetProducts = this._wishListService
      .getLoggedUserWishList()
      .subscribe({
        next: (data) => {
          this._loader.hide();
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
    this.cancelRemoveProduct = this._wishListService.removeItem(id).subscribe({
      next: (data) => {
        if (data.status == 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.message,
            showConfirmButton: true,
            timer: 1500,
          });
          if (this.productsArray) {
            this.productsArray = this.productsArray.filter(
              (product) => product._id !== id
            );
          } else {
            this.getProducts();
          }
        }
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.cancelGetProducts.unsubscribe();
    this.cancelRemoveProduct?.unsubscribe();
  }
}
