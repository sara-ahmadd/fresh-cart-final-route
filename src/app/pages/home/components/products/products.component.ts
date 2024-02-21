import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];
  wishListProducts: any[] = [];
  cartItemsCount: number = 0;
  searchTerm: string = '';
  constructor(
    private _productsService: ProductsService,
    private _cartService: CartService,
    private _wishListService: WishListService,
    private _loader: LoaderService
  ) {}
  ngOnInit(): void {
    this.getProducts();
    this.getProductsInWishList();
  }
  getProducts() {
    this._loader.show();
    this._productsService.getAllProducts().subscribe({
      next: (data) => {
        this._loader.hide();
        if (data) {
          this.allProducts = data.data;
        }
      },
      error: (err) => {
        this._loader.hide();
        console.log(err);
      },
    });
  }

  getProductsInWishList() {
    this._loader.show();
    this._wishListService.getLoggedUserWishList().subscribe({
      next: (data) => {
        this._loader.hide();
        if (data.status == 'success') {
          this.wishListProducts = data.data.map(
            (product: Product) => product._id
          );
        }
      },
      error: (err) => {
        this._loader.hide();
        this._loader.show();
        console.log(err);
      },
    });
  }
}
