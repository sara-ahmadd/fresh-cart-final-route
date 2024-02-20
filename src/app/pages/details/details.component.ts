import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplaySpeed: 700,
    autoplayTimeout: 100,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
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
