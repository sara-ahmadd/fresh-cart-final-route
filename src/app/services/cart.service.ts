import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  userToken: string = localStorage.getItem('userToken') ?? '';
  totalCartItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private _httpClient: HttpClient) {}
  addToCart(id: string): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/v1/cart`, {
      productId: id,
    });
  }
  setCartItemsCount(num: number) {
    this.totalCartItems.next(num);
  }

  getLoggedUserCart(): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/cart`);
  }
  removeItemFromCart(id: string): Observable<any> {
    return this._httpClient.delete(`${baseUrl}/api/v1/cart/${id}`, {
      headers: {
        token: this.userToken,
      },
    });
  }
  updateCartItemCount(count: number, id: string): Observable<any> {
    return this._httpClient.put(`${baseUrl}/api/v1/cart/${id}`, {
      count: `${count}`,
    });
  }

  clearCart(): Observable<any> {
    return this._httpClient.delete(`${baseUrl}/api/v1/cart`);
  }
}
