import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-net-worth',
  templateUrl: './net-worth.component.html',
  styleUrls: ['./net-worth.component.css'],
})
export class NetWorthComponent implements OnInit {
  constructor(
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  openId: any = 0;

  c_loanAmount = 0;
  c_intrestRate = 14;
  c_months = 60;
  c_emi = 0;

  ammountPEMI: any = 0;
  EMI1: any = 0;
  EMI2: any = 0;
  IIR1: any = 0;
  IIR2: any = 0;
  netWorth1: any = 0;
  netWorth2: any = 0;
  totalNetWorth: any = 0;
  loanAmmount: any = 0;
  loanAmountRatio: any = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.openId = params.id;
      if (this.openId != 0) {
        this.getSingleData();
      }
    });
  }

  getSingleData() {
    let data = new FormData();

    data.append('id', this.openId);
    data.append('action', 'getSingleDataLoan');

    this.ds.submitAppData(data).subscribe((response: any) => {
      let data2 = new FormData();
      data2.append('id', this.openId);
      data2.append('action', 'getSingleNetWorth');
      this.ds.submitAppData(data2).subscribe((response2: any) => {
        this.loanAmmount = response[response.length - 1].loanRequest;
        this.c_loanAmount = response[response.length - 1].loanRequest;
        this.updateTotal();

        let result2 = response2[response2.length - 1];

        this.c_loanAmount = result2.c_loanAmount;
        this.c_intrestRate = result2.c_intrestRate;
        this.c_months = result2.c_months;
        this.c_emi = result2.c_emi;

        this.ammountPEMI = this.c_emi;
        this.EMI1 = result2.EMI1;
        this.EMI2 = result2.EMI2;
        this.IIR1 = result2.IIR1;
        this.IIR2 = result2.IIR2;
        this.netWorth1 = result2.netWorth1;
        this.netWorth2 = result2.netWorth2;
        this.totalNetWorth = result2.totalNetWorth;
        this.loanAmmount = result2.loanAmmount;
        this.loanAmountRatio = result2.loanAmountRatio;
      });
    });
  }

  handleSubmit() {
    let data: any = new FormData();

    data.append('action', 'submit-net-worth');

    data.append('ref_id', this.openId);
    data.append('c_loanAmount', this.c_loanAmount);
    data.append('c_intrestRate', this.c_intrestRate);
    data.append('c_months', this.c_months);
    data.append('c_emi', this.c_emi);

    data.append('ammountPEMI', this.c_emi);
    data.append('EMI1', this.EMI1);
    data.append('EMI2', this.EMI2);
    data.append('IIR1', this.IIR1);
    data.append('IIR2', this.IIR2);
    data.append('netWorth1', this.netWorth1);
    data.append('netWorth2', this.netWorth2);
    data.append('totalNetWorth', this.totalNetWorth);
    data.append('loanAmmount', this.loanAmmount);
    data.append('loanAmountRatio', this.loanAmountRatio);

    this.ds.submitAppData(data).subscribe((response: any) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
      this.goNext();
      console.log(response);
    });
  }

  goNext() {
    this.router.navigateByUrl('client-vist/' + this.openId);
  }

  pmt(rate: any, nperiod: any, pv: any, fv: any, type: any) {
    if (!fv) fv = 0;
    if (!type) type = 0;

    if (rate == 0) return -(pv + fv) / nperiod;

    var pvif = Math.pow(1 + rate, nperiod);
    var pmt = (rate / (pvif - 1)) * (pv * pvif + fv);

    if (type == 1) {
      pmt /= 1 + rate;
    }

    return pmt;
  }

  updateTotal() {
    let result: any = this.pmt(
      this.c_intrestRate / 12 / 100,
      this.c_months,
      this.c_loanAmount,
      0,
      0
    );
    this.c_emi = Math.round(result);

    this.IIR1 = this.EMI1 / this.c_emi;
    this.IIR1 = this.IIR1.toFixed(2);
    this.IIR2 = this.EMI2 / this.c_emi;
    this.IIR2 = this.IIR2.toFixed(2);

    this.totalNetWorth = parseInt(this.netWorth1) + parseInt(this.netWorth2);

    this.loanAmountRatio = this.totalNetWorth / this.loanAmmount;
  }

  goBack() {
    this.router.navigateByUrl('loan-request/' + this.openId);
  }
}
