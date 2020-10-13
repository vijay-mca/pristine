import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import {
  REQUEST_HEADER,
  AUTH_USERNAME,
  AUTH_PASSWORD,
  API,
} from 'src/environments/api';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public totalQuantity: any = 0;
  public totalPrice: any = '0.00';
  public subTotal: any = '0.00';
  public currency: string = '\u00A3';
  public navClass: string;
  noInternet: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    setInterval(() => {
      this.checkConnection();
    }, 2000);
  }

  closeNav(): void {
    this.navClass = 'w-0';
  }

  openNav(): void {
    this.navClass = 'w-250';
  }

  getUniqueId(): any {
    let pristine_uid = localStorage.getItem('pristine_uid');
    return pristine_uid;
  }

  getMemberId(): any {
    let member_id =
      localStorage.getItem('member_id') === null
        ? 0
        : localStorage.getItem('member_id');
    return member_id;
  }

  convertUrlEncoded(post: any): void {
    let formBody: any = [];
    for (let property in post) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(post[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    return formBody;
  }

  cartRefresh(): void {
    let headers = new HttpHeaders(REQUEST_HEADER);
    let options = { headers: headers };

    const post = {
      auth_username: AUTH_USERNAME,
      auth_password: AUTH_PASSWORD,
      action: 'CartRefresh',
      unique_id: localStorage.getItem('pristine_uid'),
    };

    let formBody: any = this.convertUrlEncoded(post);

    this.http.post<any>(API, formBody, options).subscribe((res) => {
      const { total_price, total_quantity }: any = res;

      this.totalQuantity = total_quantity;
      this.totalPrice = total_price;
    });
  }

  cartSummary(): void {
    let headers = new HttpHeaders(REQUEST_HEADER);
    let options = { headers: headers };

    const post = {
      auth_username: AUTH_USERNAME,
      auth_password: AUTH_PASSWORD,
      action: 'CartSummary',
      unique_id: localStorage.getItem('pristine_uid'),
    };

    let formBody: any = this.convertUrlEncoded(post);

    this.http.post<any>(API, formBody, options).subscribe((res) => {
      const {
        sub_total: { subtotal },
      }: any = res;
      this.subTotal = subtotal;
    });
  }

  checkConnection(): void {
    if (navigator.onLine) {
      this.noInternet = false;
    } else {
      this.noInternet = true;
    }
  }
}
