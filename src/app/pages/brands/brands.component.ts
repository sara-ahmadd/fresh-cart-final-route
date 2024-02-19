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
  constructor(private _brandService: BrandsService) {}

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this._brandService.getAllBrands().subscribe({
      next: (data) => {
        if (data) {
          this.brands = data.data;
          // console.log(data);
        }
      },
      error: (err) => {
        if (err) {
          this.errorMsg = err.error.message;
        }
        console.log(err);
      },
    });
  }
}
