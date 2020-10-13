import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AUTH_USERNAME,
  AUTH_PASSWORD,
  REQUEST_HEADER,
  API,
} from 'src/environments/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  public authenticate: boolean;
  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit(): void {
    this.generateUniqueId();
    this.authenticateUser();
  }

  authenticateUser(): void {
    const member_id: any = localStorage.getItem('member_id');
    if (member_id === null) {
      this.authenticate = false;
    } else {
      this.authenticate = true;
    }
  }

  generateUniqueId(): void {
    if (localStorage.getItem('pristine_uid') === null) {
      let headers = new HttpHeaders(REQUEST_HEADER);
      let options = {
        headers: headers,
      };

      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'GenerateUniqueId',
      };

      let formBody: any = [];
      for (let property in post) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(post[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      this.http.post<any>(API, formBody, options).subscribe((res) => {
        const { unique_id }: any = res;
        localStorage.setItem('pristine_uid', unique_id);
      });
    }
  }
}
