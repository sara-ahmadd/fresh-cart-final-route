import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private _httpClient: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/brands`);
  }
  getOneBrand(brandId: string): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/brands/${brandId}`);
  }
}
