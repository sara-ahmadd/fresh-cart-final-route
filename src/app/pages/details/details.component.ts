import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  productId: string = this._activatedRoute.snapshot.params['id'];
  productDetails!: Product;
  constructor(
    private _productsService: ProductsService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProduct(this.productId);
  }
  getProduct(id: string) {
    this._productsService.getSingleProduct(id).subscribe({
      next: (data) => {
        this.productDetails = data.data;
        // console.log(this.productDetails);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
