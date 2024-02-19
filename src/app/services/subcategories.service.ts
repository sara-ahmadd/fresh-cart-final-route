import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../baseUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesService {
  constructor(private _httpClient: HttpClient) {}

  getSubCategoriesOfSpecificCat(id: string): Observable<any> {
    return this._httpClient.get(
      `${baseUrl}/api/v1/categories/${id}/subcategories`
    );
  }
}
