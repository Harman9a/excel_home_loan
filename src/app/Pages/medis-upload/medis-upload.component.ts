import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-medis-upload',
  templateUrl: './medis-upload.component.html',
  styleUrls: ['./medis-upload.component.css'],
})
export class MedisUploadComponent implements OnInit {
  constructor(
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  filename: any = '';
  fileToUpload: any;
  typeList: any = [
    { id: 0, name: 'Select Purpose' },
    { id: 1, name: 'Property Photo' },
    { id: 2, name: 'Property Video' },
    { id: 3, name: 'NRC Copy' },
    { id: 4, name: 'Other' },
  ];

  showImageLink: any = '';

  type: any = 0;
  openId: any = 0;
  comment: any = '';

  medialist: any = [];

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.openId = params.id;
    });
    this.getData();
  }

  getData() {
    let data = new FormData();
    data.append('action', 'getMediaFile');
    data.append('id', this.openId);

    this.ds.submitAppData(data).subscribe((response: any) => {
      response.map((x: any) => {
        this.typeList.map((y: any) => {
          if (x.type == y.id) {
            x.typeName = y.name;
          }
        });
      });
      this.medialist = response;
    });
  }

  handleFileInput(files: any) {
    this.fileToUpload = files.files.item(0);

    let data = new FormData();

    data.append('action', 'saveMediaFile');
    data.append('ref_id', this.openId);
    data.append('type', this.type);
    data.append('comment', this.comment);
    data.append('file', files.files.item(0));

    this.ds.submitAppData(data).subscribe((response: any) => {
      this.type = 0;
      this.filename = '';
      this.comment = '';
      this.getData();
    });
  }

  handleSubmit() {
    console.log(this.fileToUpload);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    this.goNext();
  }

  showImg(data: any) {
    console.log(data.filename);
    this.showImageLink = this.ds.mediaUrl + data.filename;
  }

  deleteImg(MediaItem: any) {
    let data = new FormData();

    data.append('action', 'deleteMediaFile');
    data.append('id', MediaItem.id);

    this.ds.submitAppData(data).subscribe((response: any) => {
      this.showImageLink = '';
      this.getData();
    });
  }

  goNext() {
    this.router.navigateByUrl('report/' + this.openId);
  }
  goBack() {
    this.router.navigateByUrl('add-info/' + this.openId);
  }
}
