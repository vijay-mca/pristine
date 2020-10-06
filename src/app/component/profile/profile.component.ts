import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    const reg_id = localStorage.getItem('userToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    this.http
      .post<any>(
        'http://localhost/pristin/API.php',
        {
          action: 'My Profile',
          reg_id: reg_id,
        },
        options
      )
      .subscribe((res) => {
        const { status } = res;
        if (status === 'success') {
          const {
            first_name,
            last_name,
            email_id,
            mobile_no,
            created_at,
            updated_at,
          } = res;
          this.firstName = first_name;
          this.lastName = last_name;
          this.emailId = email_id;
          this.mobileNo = mobile_no;
          this.createdAt = created_at;
          this.updatedAt = updated_at;
        }
      });
  }
}
