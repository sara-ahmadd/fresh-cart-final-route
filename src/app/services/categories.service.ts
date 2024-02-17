import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private _httpClient: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/categories`);
  }
}
