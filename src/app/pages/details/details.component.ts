import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { WishListService } from 'src/app/services/wish-list.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Subscription } from 'rxjs';

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
  heartIconRedColor: boolean = false;
  productDetails!: Product;

  constructor(
    private _productsService: ProductsService,
    private _activatedRoute: ActivatedRoute,
    private _wishList: WishListService,
    private _loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.getProduct(this.productId);
    this.checkWishList();
  }
  getProduct(id: string) {
    this._loader.show();
    this._productsService.getSingleProduct(id).subscribe({
      next: (data) => {
        this._loader.hide();
        this.productDetails = data.data;
        // console.log(this.productDetails);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  checkWishList() {
    this._wishList.getLoggedUserWishList().subscribe({
      next: (data) => {
        if (data.status == 'success') {
          if (data.data.find((prod: Product) => prod._id == this.productId)) {
            this.heartIconRedColor = true;
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
