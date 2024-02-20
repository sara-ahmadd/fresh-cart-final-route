import { Component, OnInit } from '@angular/core';
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
        if (data) {
          this.brands = data.data;
          // console.log(data);
        }
      },
      error: (err) => {
        this._loader.hide();
        if (err) {
          this.errorMsg = err.error.message;
        }
        console.log(err);
      },
    });
  }
}
