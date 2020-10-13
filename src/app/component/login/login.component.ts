import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  API,
  REQUEST_HEADER,
  AUTH_USERNAME,
  AUTH_PASSWORD,
} from 'src/environments/api';
import { CommonService } from 'src/app/service/common.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  inValidUserName: boolean;
  inValidPassword: boolean;
  unUseUserName: boolean;
  unUsePassword: boolean;
  status: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    public auth: AuthService,
    public common: CommonService
  ) {
    this.unUseUserName = true;
    this.unUsePassword = true;
  }
  ngOnInit(): void {}

  onKeyUp(event: any, property: string): void {
    if (property === 'userName') {
      if (event.target.value === '') {
        this.inValidUserName = true;
        this.unUseUserName = true;
      } else {
        this.inValidUserName = false;
        this.userName = event.target.value;
        this.unUseUserName = false;
      }
    }

    if (property === 'password') {
      if (event.target.value === '') {
        this.inValidPassword = true;
        this.unUsePassword = true;
      } else {
        this.password = event.target.value;
        this.inValidPassword = false;
        this.unUsePassword = false;
      }
    }
  }

  handleLogin(event: any) {
    let headers = new HttpHeaders(REQUEST_HEADER);
    let options = { headers: headers };

    const post = {
      auth_username: AUTH_USERNAME,
      auth_password: AUTH_PASSWORD,
      action: 'Login',
      Email: this.userName,
      password: this.password,
    };

    let formBody: any = this.common.convertUrlEncoded(post);

    this.http.post<any>(API, formBody, options).subscribe((res) => {
      const { status }: any = res;

      if (status === 'success') {
        const { mem_id }: any = res;
        localStorage.setItem('member_id', mem_id);
        this.router.navigate(['/profile']);
      } else {
        this.status = status;
      }
    });
  }
}
