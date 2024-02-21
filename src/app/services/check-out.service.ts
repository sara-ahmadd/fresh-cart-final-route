import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  myDomainName: string = 'http://localhost:4200';
  userToken: string = localStorage.getItem('userToken') ?? '';
  constructor(private _httpClient: HttpClient) {}

  checkOutSession(
    cartId: string,
    detailsObject: {
      details: string;
      phone: string;
      city: string;
    }
  ): Observable<any> {
    return this._httpClient.post(
      `${baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${this.myDomainName}`,
      {
        shippingAddress: detailsObject,
      },
      {
        headers: {
          token: this.userToken,
        },
      }
    );
  }
  getAllOrders(userId: string): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/v1/orders/user/${userId}`);
  }
}