import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  // allProducts: Product[] = [];
  // constructor(private _productsService: ProductsService) {}
  // ngOnInit(): void {
  //   this.getProducts();
  // }
  // getProducts() {
  //   this._productsService.getAllProducts().subscribe({
  //     next: (data) => {
  //       this.allProducts = data.data;
  //       // console.log(this.allProducts);
  //     },
  //     error: (err) => {
  //       // console.log(err);
  //     },
  //   });
  // }
}
