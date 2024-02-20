import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  userToken: string = localStorage.getItem('userToken') ?? '';
  constructor(private _httpClient: HttpClient) {}

  createCashOrder(
    userId: string,
    detailsObject: {
      details: string;
      phone: string;
      city: string;
    }
  ): Observable<any> {
    return this._httpClient.post(
      `${baseUrl}/api/v1/orders/${userId}`,
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
}
