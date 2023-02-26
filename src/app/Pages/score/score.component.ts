import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {
  constructor(
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  openId: any = 0;

  mws_total = 0;
  mws_total_old = 0;
  m_score = 0;
  total_score_end = 0;
  total_score_end2 = 0;

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
    data.append('action', 'getSinglerisk-2');
    this.ds.submitAppData(data).subscribe((response: any) => {
      let result2 = response[response.length - 1];
      result2 = JSON.parse(result2.JsonData);

      let data2 = new FormData();
      data2.append('id', this.openId);
      data2.append('action', 'getSinglerisk-1');
      this.ds.submitAppData(data2).subscribe((response2: any) => {
        let data3 = new FormData();
        data3.append('id', this.openId);
        data3.append('action', 'getScore');
        this.ds.submitAppData(data3).subscribe((response3: any) => {
          let result3 = response3[response3.length - 1];
         
          let result1 = response2[response2.length - 1];
          result1 = JSON.parse(result1.JsonData);
          this.mws_total_old = result1.mws_total;
          this.mws_total = result2.mws_total;
          this.m_score = parseInt(result3.m_score)
          this.total_score_end = this.mws_total_old + this.mws_total + 20;
          this.total_score_end2 =
            this.mws_total_old + this.mws_total + this.m_score;
        });
      });
    });
  }

  updateTotal() {
    this.total_score_end2 = this.mws_total_old + this.mws_total + this.m_score;
  }

  handleSubmit() {
    let JsonData = {
      mws_total: this.mws_total,
      mws_total_old: this.mws_total_old,
    };
    let data: any = new FormData();

    data.append('action', 'scoreSubmit');
    data.append('ref_id', this.openId);
    data.append('m_score', this.m_score);
    data.append('total1', this.total_score_end);
    data.append('total2', this.total_score_end2);

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
    this.router.navigateByUrl('add-info/' + this.openId);
  }

  goBack() {
    this.router.navigateByUrl('risk-2/' + this.openId);
  }
}
