import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _httpClient: HttpClient) {}
  getAllProducts(): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/products`);
  }
  getSingleProduct(id: string): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/products/${id}`);
  }
}
