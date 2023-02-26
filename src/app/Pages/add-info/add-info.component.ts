import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css'],
})
export class AddInfoComponent implements OnInit {
  constructor(
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  openId: any = 0;

  loanNo: any = '';
  loandate: any = '';
  purposeLoan: any = '';
  roi: any = '';
  roia: any = '';
  moratorium: any = '';
  noi: any = '';
  EMI: any = 0;
  emiStatingMonth: any = '';
  terms: any = '';
  name1: any = '';
  designation1: any = '';
  name2: any = '';
  designation2: any = '';
  name3: any = '';
  designation3: any = '';
  guarantor: any = '';

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.openId = params.id;
      if (this.openId != 0) {
        this.getSingleData();
      }
    });
  }


  

  handleUpdate(value: number, type: number, no: number) {}

  getSingleData() {
    let data = new FormData();
    data.append('id', this.openId);
    data.append('action', 'getSingleNetWorth');
    this.ds.submitAppData(data).subscribe((response: any) => {
      let data2 = new FormData();
      data2.append('id', this.openId);
      data2.append('action', 'getaddinfo');
      this.ds.submitAppData(data2).subscribe((response2: any) => {
        let result = response2[response2.length - 1];
        result = JSON.parse(result.JsonData);
        this.loanNo = result.loanNo;
        this.loandate = result.loandate;
        this.purposeLoan = result.purposeLoan;
        this.roi = result.roi;
        this.roia = result.roia;
        this.moratorium = result.moratorium;
        this.noi = response[0].c_months;
        this.EMI = response[0].c_emi;
        this.emiStatingMonth = result.emiStatingMonth;
        this.terms = result.terms;
        this.name1 = result.name1;
        this.designation1 = result.designation1;
        this.name2 = result.name2;
        this.designation2 = result.designation2;
        this.name3 = result.name3;
        this.designation3 = result.designation3;
        this.guarantor = result.guarantor;
      });

      this.EMI = response[0].ammountPEMI;
    });
  }

  handleSubmit() {
    let JsonData = {
      loanNo: this.loanNo,
      loandate: this.loandate,
      purposeLoan: this.purposeLoan,
      roi: this.roi,
      roia: this.roia,
      moratorium: this.moratorium,
      noi: this.noi,
      EMI: this.EMI,
      emiStatingMonth: this.emiStatingMonth,
      terms: this.terms,
      name1: this.name1,
      designation1: this.designation1,
      name2: this.name2,
      designation2: this.designation2,
      name3: this.name3,
      designation3: this.designation3,
      guarantor: this.guarantor,
    };

    let data: any = new FormData();

    data.append('action', 'submit-add-info');
    data.append('ref_id', this.openId);
    data.append('noi', this.noi);
    data.append('EMI', this.EMI);
    data.append('JsonData', JSON.stringify(JsonData));

    this.ds.submitAppData(data).subscribe((response: any) => {
      // Swal.fire({
      //   position: 'top-end',
      //   icon: 'success',
      //   title: 'Your work has been saved',
      //   showConfirmButton: false,
      //   timer: 1500
      // })
      // this.goNext()
      console.log(response);
    });
  }

  goNext() {
    this.router.navigateByUrl('media-upload/' + this.openId);
  }
  goBack() {
    this.router.navigateByUrl('score/' + this.openId);
  }
}
