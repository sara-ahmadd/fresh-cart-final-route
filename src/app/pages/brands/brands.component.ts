import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandsService } from 'src/app/services/brands.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  brands: any[] = [];
  errorMsg: string = '';
  brandName: string = '';
  brandImg: string = '';

  constructor(
    private _brandService: BrandsService,
    private _loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this._loader.show();
    this._brandService.getAllBrands().subscribe({
      next: (data) => {
        this._loader.hide();
        if (data && data.data) {
          this.brands = data.data;
        }
      },
      error: (err) => {
        this._loader.hide();
        if (err) {
          this.errorMsg = err.error.message;
        }
      },
    });
  }
  getSpecificBrand(id: string) {
    this._brandService.getOneBrand(id).subscribe({
      next: (data) => {
        this._loader.hide();
        this.brandName = data.data.name;
        this.brandImg = data.data.image;
      },
      error: (err) => {
        this._loader.hide();
      },
    });
  }
  openModal(id: string) {
    if (id && id.length > 0) {
      this._loader.show();
      this.getSpecificBrand(id);
    }
  }
}
