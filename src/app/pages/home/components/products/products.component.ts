import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
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
    private _wishListService: WishListService
  ) {}
  ngOnInit(): void {
    this.getProducts();
    this.getProductsInWishList();
  }
  getProducts() {
    this._productsService.getAllProducts().subscribe({
      next: (data) => {
        if (data) {
          this.allProducts = data.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getProductsInWishList() {
    this._wishListService.getLoggedUserWishList().subscribe({
      next: (data) => {
        if (data.status == 'success') {
          this.wishListProducts = data.data.map(
            (product: Product) => product._id
          );
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
