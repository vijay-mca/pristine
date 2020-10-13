import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CommonService } from 'src/app/service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import {
  AUTH_USERNAME,
  AUTH_PASSWORD,
  API,
  REQUEST_HEADER,
  CHECKOUT,
} from 'src/environments/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent implements OnInit {
  @ViewChild('removeBasketModal') private removeBasketModalRef: any;
  @ViewChild('clearBasketModal') private clearBasketModalRef: any;

  loading: boolean;
  cartItem: any = [];
  newQty: any = [];
  basketId: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private actRoute: ActivatedRoute,
    public authService: AuthService,
    public common: CommonService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cart();
    this.common.cartSummary();
  }

  cart() {
    try {
      this.loading = true;
      let headers = new HttpHeaders(REQUEST_HEADER);
      let options = {
        headers: headers,
      };

      const post: any = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'Cart',
        unique_id: localStorage.getItem('pristine_uid'),
      };

      let formBody: any = this.common.convertUrlEncoded(post);

      this.http.post<any>(API, formBody, options).subscribe((res) => {
        const { result } = res;
        this.cartItem = result;
        for (let index = 0; index < result.length; index++) {
          this.newQty[index] = result[index].quantity;
        }
        this.loading = false;
      });
    } catch (error) {}
  }

  modifyQuantity(
    type: string,
    basket_id: number,
    current_qty: number,
    price: any,
    index: number
  ): void {
    try {
      let headers = new HttpHeaders(REQUEST_HEADER);
      let options = {
        headers: headers,
      };

      const post: any = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'ModifyQuantity',
        unique_id: localStorage.getItem('pristine_uid'),
        type,
        basket_id,
        current_qty,
        price,
      };

      let formBody: any = this.common.convertUrlEncoded(post);

      this.http.post<any>(API, formBody, options).subscribe((res) => {
        const { new_qty } = res;
        if (new_qty === 0) {
          this.modalService.open(this.removeBasketModalRef, {
            windowClass: 'dark-modal',
          });
          this.basketId = basket_id;
        }
        this.newQty[index] = new_qty;
        this.cart();
        this.common.cartSummary();
        this.common.cartRefresh();
      });
    } catch (error) {}
  }

  removeBasket(basket_id: number): any {
    try {
      let headers = new HttpHeaders(REQUEST_HEADER);
      let options = {
        headers: headers,
      };

      const post: any = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'RemoveBasket',
        unique_id: localStorage.getItem('pristine_uid'),
        basket_id,
      };

      let formBody: any = this.common.convertUrlEncoded(post);

      this.http.post<any>(API, formBody, options).subscribe((res) => {
        this.modalService.dismissAll();
        this.cart();
        this.common.cartSummary();
        this.common.cartRefresh();
      });
    } catch (error) {}
  }

  clearBasket(): any {
    try {
      let headers = new HttpHeaders(REQUEST_HEADER);
      let options = {
        headers: headers,
      };

      const post: any = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'clearBasket',
        unique_id: localStorage.getItem('pristine_uid'),
      };

      let formBody: any = this.common.convertUrlEncoded(post);

      this.http.post<any>(API, formBody, options).subscribe((res) => {
        this.modalService.dismissAll();
        this.cart();
        this.common.cartSummary();
        this.common.cartRefresh();
      });
    } catch (error) {}
  }

  openRemoveBasketModal(basket_id: number): any {
    this.modalService.open(this.removeBasketModalRef, {
      windowClass: 'dark-modal',
    });
    this.basketId = basket_id;
  }

  openClearBasketModal(basket_id: number): any {
    this.modalService.open(this.clearBasketModalRef, {
      windowClass: 'dark-modal',
    });
  }

  checkout(): void {
    // location.href = CHECKOUT + '?unique_id=' + this.common.getUniqueId();
    window.open(CHECKOUT + '?unique_id=' + this.common.getUniqueId())
  }
}
