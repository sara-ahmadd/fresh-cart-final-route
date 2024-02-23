import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/services/brands.service';

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

  constructor(private _brandService: BrandsService) {}

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this._brandService.getAllBrands().subscribe({
      next: (data) => {
        if (data && data.data) {
          this.brands = data.data;
        }
      },
      error: (err) => {
        if (err) {
          this.errorMsg = err.error.message;
        }
      },
    });
  }
  getSpecificBrand(id: string) {
    this._brandService.getOneBrand(id).subscribe({
      next: (data) => {
        this.brandName = data.data.name;
        this.brandImg = data.data.image;
      },
      error: (err) => {},
    });
  }
  openModal(id: string) {
    if (id && id.length > 0) {
      this.getSpecificBrand(id);
    }
  }
}
