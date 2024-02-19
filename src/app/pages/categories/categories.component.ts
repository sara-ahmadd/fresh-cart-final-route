import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubcategoriesService } from 'src/app/services/subcategories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  // cancelSubscribtion!: { [key: string]: Subscription };
  subCategoriesArray: any[] = [];
  categories: Category[] = [];
  constructor(
    private _categories: CategoriesService,
    private _subCatService: SubcategoriesService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }
  openModal(id: string) {
    if (id && id.length > 0) {
      this._subCatService.getSubCategoriesOfSpecificCat(id).subscribe({
        next: (data) => {
          if (data) {
            this.subCategoriesArray = data.data;
            console.log(data);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  // closeModal() {
  //   this.cancelSubscribtion['subcategories']?.unsubscribe();
  // }
  getCategories() {
    this._categories.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data.data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
