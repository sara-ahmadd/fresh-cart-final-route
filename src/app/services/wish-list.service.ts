import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  userToken: string = localStorage.getItem('userToken') ?? '';

  constructor(private _httpClient: HttpClient) {}

  getLoggedUserWishList(): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/wishlist`, {
      headers: {
        token: this.userToken,
      },
    });
  }
  addToWishList(prodId: string): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/v1/wishlist`, {
      productId: prodId,
    });
  }
  removeItem(prodId: string): Observable<any> {
    return this._httpClient.delete(`${baseUrl}/api/v1/wishlist/${prodId}`);
  }
}
