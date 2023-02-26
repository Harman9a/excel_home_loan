import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class DashbordComponent implements OnInit {
  constructor(private ds: DataService, private router: Router) {}

  dataList: any = [];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let data = new FormData();
    data.append('action', 'getAppDataList');
    this.ds.getAppDataList(data).subscribe((response: any) => {
      this.dataList = response;
    });
  }

  openData(id: any) {
    this.router.navigateByUrl('applicant-data/' + id);
  }

  deleteAcc(id:any){
    let data = new FormData();
    data.append('action', 'deleteAppDataList');
    data.append('id', id);
    this.ds.getAppDataList(data).subscribe((response: any) => {
      console.log(response)
      this.getData();
    });
  }
}
