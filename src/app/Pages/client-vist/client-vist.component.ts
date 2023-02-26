import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-client-vist',
  templateUrl: './client-vist.component.html',
  styleUrls: ['./client-vist.component.css'],
})
export class ClientVistComponent implements OnInit {
  constructor(
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  openId: any = 0;

  name1 = '';
  name2 = '';
  designation1 = '';
  designation2 = '';
  visitDate1 = '';
  visitDate2 = '';
  comment1 = '';
  comment2 = '';
  comment3 = '';
  comment4 = '';
  g_visitDate = '';

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
    data.append('action', 'getSingleClientVisit');

    this.ds.submitAppData(data).subscribe((response: any) => {
      let result = response[response.length - 1];

      this.name1 = result.name1;
      this.name2 = result.name2;
      this.designation1 = result.designation1;
      this.designation2 = result.designation2;
      this.visitDate1 = result.visitDate1;
      this.visitDate2 = result.visitDate2;
      this.comment1 = result.comment1;
      this.comment2 = result.comment2;
      this.comment3 = result.comment3;
      this.comment4 = result.comment4;
      this.g_visitDate = result.g_visitDate;
    });
  }

  handleSubmit() {
    let data: any = new FormData();

    data.append('action', 'submit-client-visit');

    data.append('ref_id', this.openId);
    data.append('name1', this.name1);
    data.append('name2', this.name2);
    data.append('designation1', this.designation1);
    data.append('designation2', this.designation2);
    data.append('visitDate1', this.visitDate1);
    data.append('visitDate2', this.visitDate2);
    data.append('comment1', this.comment1);
    data.append('comment2', this.comment2);
    data.append('comment3', this.comment3);
    data.append('comment4', this.comment4);
    data.append('g_visitDate', this.g_visitDate);

    this.ds.submitAppData(data).subscribe((response: any) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.goNext();
      console.log(response);
    });
  }

  goNext() {
    this.router.navigateByUrl('site-vist/' + this.openId);
  }

  updateTotal() {
    console.log('ok');
  }

  goBack() {
    this.router.navigateByUrl('net-worth/' + this.openId);
  }
}
