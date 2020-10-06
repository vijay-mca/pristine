import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { API } from 'src/environments/api';

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

  constructor(private http: HttpClient, private router: Router) {
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
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };

    this.http
      .post<any>(
        API,
        {
          action: 'Login',
          username: this.userName,
          password: this.password,
        },
        options
      )
      .subscribe((res) => {
        const { status }: any = res;

        if (status === 'success') {
          const { reg_id }: any = res;
          localStorage.setItem('userToken', reg_id);
          this.router.navigate(['/profile']);
        } else {
          this.status = status;
        }
      });
  }
}
