import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.css'],
})
export class CategorySliderComponent implements OnInit {
  allCategories: Category[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      425: {
        items: 3,
      },
      786: {
        items: 5,
      },
      980: {
        items: 8,
      },
    },
    nav: true,
  };
  constructor(private _categoriesService: CategoriesService) {}
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this._categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.allCategories = data.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
