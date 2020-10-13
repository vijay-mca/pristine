import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  API,
  AUTH_USERNAME,
  AUTH_PASSWORD,
  REQUEST_HEADER,
} from 'src/environments/api';
import { AuthService } from 'src/app/service/auth.service';
import { CommonService } from 'src/app/service/common.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  firstName: string;
  lastName: string;
  emailId: string;
  mobileNo: string;
  createdAt: Date;
  updatedAt: any;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.authService.authenticateUser();
  }

  getUserProfile(): void {
    const member_id = this.common.getMemberId();
    let headers = new HttpHeaders(REQUEST_HEADER);
    let options = {
      headers: headers,
    };

    const post = {
      auth_username: AUTH_USERNAME,
      auth_password: AUTH_PASSWORD,
      action: 'MyAccount',
      member_id,
    };

    let formBody: any = this.common.convertUrlEncoded(post);

    this.http.post<any>(API, formBody, options).subscribe((res) => {
      const { MemberDetails } = res;

      if (MemberDetails.length !== '') {
        const {
          mem_name,
          mem_lname,
          email_id,
          mobile_no,
          added_date,
          updated_date,
        } = MemberDetails;
        this.firstName = mem_name;
        this.lastName = mem_lname;
        this.emailId = email_id;
        this.mobileNo = mobile_no;
        this.createdAt = added_date;
        this.updatedAt = updated_date;
      }
    });
  }
}
