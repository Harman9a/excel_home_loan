import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.css'],
})
export class LoanRequestComponent implements OnInit {
  constructor(
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  openId: any = 0;

  am1: number = 0;
  am2: number = 0;
  am3: number = 0;
  am4: number = 0;
  am5: number = 0;
  am6: number = 0;
  am7: number = 0;
  total: number = 0;

  d1: any = '';
  d2: any = '';
  d3: any = '';
  d4: any = '';
  d5: any = '';
  d6: any = '';
  d7: any = '';

  appMargin: number = 0;
  appMarginD: any = '';

  marginAge: number = 0;

  loanRequest: number = 0;
  loanRequestD: any = '';

  propertyD: any = '';
  comment: any = '';

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.openId = params.id;
      if (this.openId != 0) {
        this.getSingleData();
      }
    });

    this.updateTotal();
  }

  getSingleData() {
    let data = new FormData();

    data.append('id', this.openId);
    data.append('action', 'getSingleDataLoan');

    this.ds.submitAppData(data).subscribe((response: any) => {
      let data = response[0];
      let dataJson = JSON.parse(data.dataJson);

      this.am1 = dataJson[0].cost;
      this.d1 = dataJson[0].detail;

      this.am2 = dataJson[1].cost;
      this.d2 = dataJson[1].detail;

      this.am3 = dataJson[2].cost;
      this.d3 = dataJson[2].detail;

      this.am4 = dataJson[3].cost;
      this.d4 = dataJson[3].detail;

      this.am5 = dataJson[4].cost;
      this.d5 = dataJson[4].detail;

      this.am6 = dataJson[5].cost;
      this.d6 = dataJson[5].detail;

      this.am7 = dataJson[6].cost;
      this.d7 = dataJson[6].detail;

      this.total = data.total;
      this.appMargin = data.appMargin;
      this.appMarginD = data.appMarginD;
      this.marginAge = data.marginAge;
      this.loanRequest = data.loanRequest;
      this.loanRequestD = data.loanRequestD;

      this.propertyD = data.propertyD;
      this.comment = data.comment;
    });
  }

  updateTotal() {
    this.total =
      this.am1 +
      this.am2 +
      this.am3 +
      this.am4 +
      this.am5 +
      this.am6 +
      this.am7;

    this.marginAge = (this.appMargin / this.total) * 100;

    this.loanRequest = this.total - this.appMargin;
  }

  handleSubmit() {
    let arr: any = [
      {
        id: 1,
        cost: this.am1,
        detail: this.d1,
      },
      {
        id: 2,
        cost: this.am2,
        detail: this.d2,
      },
      {
        id: 3,
        cost: this.am3,
        detail: this.d3,
      },
      {
        id: 4,
        cost: this.am4,
        detail: this.d4,
      },
      {
        id: 5,
        cost: this.am5,
        detail: this.d5,
      },
      {
        id: 6,
        cost: this.am6,
        detail: this.d6,
      },
      {
        id: 7,
        cost: this.am7,
        detail: this.d7,
      },
    ];

    let data: any = new FormData();
    data.append('ref_id', this.openId);
    data.append('dataJson', JSON.stringify(arr));
    data.append('total', this.total);
    data.append('appMargin', this.appMargin);
    data.append('appMarginD', this.appMarginD);
    data.append('marginAge', this.marginAge);
    data.append('loanRequest', this.loanRequest);
    data.append('loanRequestD', this.loanRequestD);
    data.append('propertyD', this.propertyD);
    data.append('comment', this.comment);
    data.append('action', 'submit-loan-request');

    this.ds.submitAppData(data).subscribe((response: any) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.goNext();
    });
  }

  goNext() {
    this.router.navigateByUrl('net-worth/' + this.openId);
  }

  goBack() {
    this.router.navigateByUrl('guarantor-data/' + this.openId);
  }
}
