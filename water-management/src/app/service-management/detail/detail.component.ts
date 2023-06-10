import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { switchMap } from 'rxjs';
import { BangGia } from 'src/model/BangGia';
import { MucLuyTien } from 'src/model/MucLuyTiens';
import * as xmlJs from 'xml-js';
import { ServiceManagementService } from '../service-management.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  isVisible = false;
  dichVuNuocId!: number;
  form!: FormGroup;
  i = 0;
  listOfData: MucLuyTien[] = [];
  listOfData1: BangGia[] = [];
  listOfData2: MucLuyTien[] = [];
  submitted = false;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ServiceManagementService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.dichVuNuocId = this.route.snapshot.params['id'];

    this.form = this.fb.group({
      id: [this.dichVuNuocId],
      tenDichVu: ['', Validators.required],
      ghiChu: [''],
    });

    this.getDichVu();
    this.getLatestBangGiaByDichVu();
    this.getBangGiaByDichVu();
  }

  getDichVu() {
    this.service.getDichVu({ id: this.dichVuNuocId }).subscribe((res) => {
      const result = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
        'soapenv:Envelope'
      ]['soapenv:Body'].getDichVuResponse.getDichVuReturn;
      this.form.patchValue({
        tenDichVu: result.tenDichVu._text,
        ghiChu: result.ghiChu._text,
      });
    });
  }

  getLatestBangGiaByDichVu() {
    this.service
      .getLatestBangGiaByDichVu({
        id: this.dichVuNuocId,
      })
      .pipe(
        switchMap((res) => {
          const result = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
            'soapenv:Envelope'
          ]['soapenv:Body'].getLatestBangGiaByDichVuResponse
            .getLatestBangGiaByDichVuReturn.id._text;

          return this.service.getAllMucLuyTienByBangGia({
            id: result,
          });
        })
      )
      .subscribe((res) => {
        this.listOfData = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
          'soapenv:Envelope'
        ][
          'soapenv:Body'
        ].getAllMucLuyTienByBangGiaResponse.getAllMucLuyTienByBangGiaReturn;

        if (!Array.isArray(this.listOfData))
          this.listOfData = [this.listOfData];
        this.listOfData = this.listOfData.map((item: any) => {
          return {
            id: this.i++,
            donGia: Number.parseInt(item.donGia._text),
            gioiHan: Number.parseInt(item.gioiHan._text),
            ghiChu: item.ghiChu?._text,
            bangGiaId: Number.parseInt(item.bangGia.id._text),
          };
        });
      });
  }

  getBangGiaByDichVu() {
    this.service
      .getAllBangGiaByDichVu({
        id: this.dichVuNuocId,
      })
      .subscribe((res) => {
        this.listOfData1 = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
          'soapenv:Envelope'
        ][
          'soapenv:Body'
        ].getAllBangGiaByDichVuResponse.getAllBangGiaByDichVuReturn;

        if (!Array.isArray(this.listOfData1))
          this.listOfData1 = [this.listOfData1];
        this.listOfData1.shift();
        this.listOfData1 = this.listOfData1.map((item: any) => {
          return {
            id: Number.parseInt(item.id._text),
            ngayTao: item.ngayTao._text,
          };
        });
      });
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: this.i,
        gioiHan: 0,
        donGia: 0,
        ghiChu: '',
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

  numberFilter(val: any) {
    return typeof val === 'number' ? val : 0;
  }

  submitDichVu() {
    this.service.updateDichVu(this.form.value).subscribe((res) => {
      const result = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
        'soapenv:Envelope'
      ]['soapenv:Body'].updateDichVuResponse.updateDichVuReturn._text;
      if (result === 'true') {
        this.notification.create(
          'success',
          'Thành công',
          'Đã lưu dịch vụ vào cơ sở dữ liệu'
        );
        this.getDichVu();
      } else this.notification.create('error', 'Thất bại', 'Đã xảy ra lỗi');
    });
  }

  submitBangGia() {
    this.service
      .saveBangGia({ dichVuNuocId: this.dichVuNuocId })
      .pipe(
        switchMap((res) => {
          const result = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
            'soapenv:Envelope'
          ]['soapenv:Body'].saveBangGiaResponse.saveBangGiaReturn._text;
          this.listOfData.forEach((item) => {
            item.bangGiaId = result;
          });
          return this.service.saveMucLuyTiens(this.listOfData);
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
            'Đã lưu bảng giá vào cơ sở dữ liệu'
          );
          this.getLatestBangGiaByDichVu();
          this.getBangGiaByDichVu();
        } else this.notification.create('error', 'Thất bại', 'Đã xảy ra lỗi');
      });
  }

  showModal(bangGiaId: any): void {
    this.isVisible = true;
    this.service
      .getAllMucLuyTienByBangGia({ id: bangGiaId })
      .subscribe((res) => {
        this.listOfData2 = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
          'soapenv:Envelope'
        ][
          'soapenv:Body'
        ].getAllMucLuyTienByBangGiaResponse.getAllMucLuyTienByBangGiaReturn;

        if (!Array.isArray(this.listOfData2))
          this.listOfData2 = [this.listOfData2];
        this.listOfData2 = this.listOfData2.map((item: any) => {
          return {
            donGia: item.donGia._text,
            gioiHan: item.gioiHan._text,
            ghiChu: item.ghiChu._text,
          };
        });
      });
  }
}
