import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { AuthService } from 'src/app/service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AUTH_USERNAME,
  AUTH_PASSWORD,
  REQUEST_HEADER,
  API,
} from 'src/environments/api';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  countryOptions: any = [];

  address_line1: string = "";
  inValidAddressLine1: boolean;
  unUseAddressLine1: boolean;

  address_line2: string;
  inValidAddressLine2: boolean;
  unUseAddressLine2: boolean;

  city: string;
  inValidCity: boolean;
  unUseCity: boolean;

  country: string;
  inValidCountry: boolean;
  unUseCountry: boolean;

  email_id: string;
  inValidEmailId: boolean;
  unUseEmailId: boolean;

  mem_id: any;

  mem_lname: string;
  inValidMemlName: boolean;
  unUseMemlName: boolean;

  mem_name: string;
  inValidMemName: boolean;
  unUseMemName: boolean;

  mobile_no: string;
  inValidMobileNo: boolean;
  unUseMobileNo: boolean;

  password: string;

  postcode: any;
  inValidPostCode: boolean;
  unUsePostCode: boolean;

  state: string;
  inValidState: boolean;
  unUseState: boolean;

  status: string;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private common: CommonService
  ) {
    this.unUseAddressLine1 = true;
    this.unUseCity = true;
    this.unUseCountry = true;
    this.unUseEmailId = true;
    this.unUseMemlName = true;
    this.unUseMemName = true;
    this.unUseMobileNo = true;
    this.unUsePostCode = true;
    this.unUseState = true;
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  onKeyUp(event: any, property: string): void {}

  onChange(event: any): void {
    if (event.target.value === '') {
    }
  }

  handleUpdate(event: any): void {}

  getUserProfile(): void {
    let headers = new HttpHeaders(REQUEST_HEADER);
    let options = {
      headers: headers,
    };

    const post = {
      auth_username: AUTH_USERNAME,
      auth_password: AUTH_PASSWORD,
      action: 'MyAccount',
      member_id: this.common.getMemberId(),
    };

    let formBody: any = this.common.convertUrlEncoded(post);

    this.http.post<any>(API, formBody, options).subscribe((res) => {
      const { MemberDetails, country_options }: any = res;
      if (MemberDetails !== false) {
      }
      this.countryOptions = country_options;
    });
  }
}
