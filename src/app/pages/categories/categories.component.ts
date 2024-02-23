import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';
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
    private _subCatService: SubcategoriesService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }
  openModal(id: string, categoryName: string) {
    if (id && id.length > 0) {
      this._subCatService.getSubCategoriesOfSpecificCat(id).subscribe({
        next: (data) => {
          if (data) {
            this.subCategoryName = categoryName;
            this.subCategoriesArray = data.data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  getCategories() {
    this._categories.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
