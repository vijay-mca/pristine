import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed: boolean = true;
  public auth: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.auth = true;
      this.router.navigate(['profile']);
    } else {
      this.auth = false;
    }
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['']);
    this.auth = false;
    this.isMenuCollapsed = true;
  }
}
