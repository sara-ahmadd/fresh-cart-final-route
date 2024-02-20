import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SubcategoriesService } from 'src/app/services/subcategories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  subCategoriesArray: any[] = [];
  subCategoryName: string = '';
  categories: Category[] = [];
  constructor(
    private _categories: CategoriesService,
    private _subCatService: SubcategoriesService,
    private _loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }
  openModal(id: string, categoryName: string) {
    if (id && id.length > 0) {
      this._loader.show();
      this._subCatService.getSubCategoriesOfSpecificCat(id).subscribe({
        next: (data) => {
          this._loader.hide();
          if (data) {
            this.subCategoryName = categoryName;
            this.subCategoriesArray = data.data;
            console.log(data);
          }
        },
        error: (err) => {
          this._loader.hide();
          console.log(err);
        },
      });
    }
  }
  // closeModal() {
  //   this.cancelSubscribtion['subcategories']?.unsubscribe();
  // }
  getCategories() {
    this._loader.show();
    this._categories.getAllCategories().subscribe({
      next: (data) => {
        this._loader.hide();
        this.categories = data.data;
        console.log(data);
      },
      error: (err) => {
        this._loader.hide();
        console.log(err);
      },
    });
  }
}
