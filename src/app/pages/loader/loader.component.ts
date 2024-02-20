import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  isLoading: boolean = false;
  constructor(private _loader: LoaderService) {
    this._loader.isLoading.subscribe((val) => (this.isLoading = val));
  }
}
