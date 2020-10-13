import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
  ElementRef,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment';

import { AuthService } from 'src/app/service/auth.service';
import { CommonService } from 'src/app/service/common.service';

import {
  AUTH_USERNAME,
  AUTH_PASSWORD,
  REQUEST_HEADER,
  API,
} from 'src/environments/api';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'app-view-competition',
  templateUrl: './view-competition.component.html',
  styleUrls: ['./view-competition.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewCompetitionComponent implements OnInit {
  @ViewChild('alertModal') private alertModalRef: any;
  @ViewChild('noInternetModal') private noInternetModalRef: TemplateRef<any>;
  @ViewChild('modalBody') private modalBodyRef: ElementRef<HTMLElement>;

  competionDetail: any = {};
  Que_Ans: any = [];
  quantity: any = [];
  diffr: number;
  days: any = [];
  hours: any = [];
  minutes: any = [];
  seconds: any = [];
  form: FormGroup;
  payLoad: any;
  status: any;
  loading: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private actRoute: ActivatedRoute,
    private authService: AuthService,
    public common: CommonService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCompetitionDetail();
    this.form = this.fb.group({
      question_answer: this.fb.array([
        this.fb.group({
          answer: [null],
        }),
      ]),
      quantity: new FormControl(0),
    });

    //this.common.checkConnection();
  }

  onSubmit(pro_id: any, price: any) {
    this.payLoad = this.form.getRawValue();
    if (
      this.payLoad.question_answer[0].answer === null ||
      this.payLoad.question_answer[0].answer === '' ||
      this.payLoad.question_answer[0].answer === undefined
    ) {
      alert('Answer all question');
    } else if (
      this.payLoad.quantity === 0 ||
      this.payLoad.quantity === '' ||
      this.payLoad.quantity === undefined
    ) {
      alert('Select quantity');
    } else {
      let question_answer = {};
      let split: any;
      for (
        let index = 0;
        index < this.payLoad.question_answer.length;
        index++
      ) {
        split = this.payLoad.question_answer[index].answer.split('_');
        question_answer[index] = { [split[1]]: split[0] };
      }

      let headers = new HttpHeaders(REQUEST_HEADER);
      let options = { headers: headers };

      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'AddToCart',
        member_id:
          localStorage.getItem('member_id') === null
            ? 0
            : localStorage.getItem('member_id'),
        unique_id: localStorage.getItem('pristine_uid'),
        product_id: pro_id,
        product_price: price,
        qty: this.payLoad.quantity,
        question_answer: JSON.stringify(question_answer),
      };

      let formBody: any = this.common.convertUrlEncoded(post);

      this.http.post<any>(API, formBody, options).subscribe((res) => {
        const { status }: any = res;
        this.common.cartRefresh();
        if (status === 'exist') {
          alert('You already added this competiton in your cart.');
        }
        this.modalService.dismissAll();
      });
    }
  }

  x(date: any): void {
    setInterval(() => {
      const now = moment();
      const expirydate = moment(date);
      const diffr: any = moment.duration(expirydate.diff(now));
      this.diffr = diffr;
      if (diffr > 0) {
        const days: any = parseInt(diffr.asDays());
        const hours: any = parseInt(diffr.asHours()) - days * 24;
        const minutes: any = parseInt(diffr.minutes());
        const seconds: any = parseInt(diffr.seconds());

        this.days = days < 10 ? '0' + days : days;
        this.hours = hours < 10 ? '0' + hours : hours;
        this.minutes = minutes < 10 ? '0' + minutes : minutes;
        this.seconds = seconds < 10 ? '0' + seconds : seconds;
      } else {
        this.days = '00';
        this.hours = '00';
        this.minutes = '00';
        this.seconds = '00';
      }
    });
  }

  getCompetitionDetail(): void {
    try {
      this.loading = true;
      let headers = new HttpHeaders(REQUEST_HEADER);
      let options = {
        headers: headers,
      };

      const post: any = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'CompetitionsDetails',
        comp_id: this.actRoute.snapshot.params.pro_id,
      };

      let formBody: any = this.common.convertUrlEncoded(post);

      this.http.post<any>(API, formBody, options).subscribe((res) => {
        const { result, questionandanswer } = res;
        this.competionDetail = result;
        this.Que_Ans = questionandanswer;

        for (let index = 0; index <= result.total_qty_ticket; index++) {
          this.quantity[index] = index;
        }

        this.x(this.competionDetail.end_date);

        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
    }
  }

  openAddToCart(modalId: string) {
    if (this.diffr > 0) {
      this.modalService.open(modalId, { windowClass: 'dark-modal' });
    } else {
      this.modalService.open(this.alertModalRef, { windowClass: 'dark-modal' });
    }
  }
}
