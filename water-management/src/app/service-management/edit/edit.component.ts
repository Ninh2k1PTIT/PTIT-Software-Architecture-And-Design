import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { forkJoin, switchMap } from 'rxjs';
import { BangGia } from 'src/model/BangGia';
import { MucLuyTien } from 'src/model/MucLuyTiens';
import * as xmlJs from 'xml-js';
import { ServiceManagementService } from '../service-management.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  form!: FormGroup;
  i = 0;
  listOfData: MucLuyTien[] = [];
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private service: ServiceManagementService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tenDichVu: ['', Validators.required],
      ghiChu: [''],
    });
    this.addRow();
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: this.i,
        gioiHan: 0,
        donGia: 0,
        ghiChu: '',
        bangGiaId: 0,
      },
    ];
    this.i++;
  }

  deleteRow(id: number | undefined): void {
    if (this.listOfData.length > 1)
      this.listOfData = this.listOfData.filter((d) => d.id !== id);
    else
      this.notification.create('warning', 'Cảnh báo', 'Cần ít nhất 01 mức giá');
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.service
      .createDichVu(this.form.value)
      .pipe(
        switchMap((res) => {
          const result = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
            'soapenv:Envelope'
          ]['soapenv:Body'].createDichVuResponse.createDichVuReturn._text;
          return this.service.saveBangGia({ dichVuNuocId: result }).pipe(
            switchMap((res) => {
              const result = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
                'soapenv:Envelope'
              ]['soapenv:Body'].saveBangGiaResponse.saveBangGiaReturn._text;
              this.listOfData.forEach((item) => {
                item.bangGiaId = result;
              });
              return this.service.saveMucLuyTiens(this.listOfData);
            })
          );
        })
      )
      .subscribe((res) => {
        const result = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
          'soapenv:Envelope'
        ]['soapenv:Body'].saveMucLuyTiensResponse.saveMucLuyTiensReturn._text;
        if (result === 'true') {
          this.notification.create(
            'success',
            'Thành công',
            'Đã lưu dịch vụ vào cơ sở dữ liệu'
          );
          this.router.navigate(['/service-management']);
        } else this.notification.create('error', 'Thất bại', 'Đã xảy ra lỗi');
      });
  }

  numberFilter(val: any) {
    return typeof val === 'number' ? val : 0;
  }
}
