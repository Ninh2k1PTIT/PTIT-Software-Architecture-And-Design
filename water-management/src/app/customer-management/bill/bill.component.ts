import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerManagementService } from '../customer-management.service';
import * as xmlJs from 'xml-js';
import { HoaDon } from 'src/model/HoaDon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DichVuHopDong } from 'src/model/DichVuHopDong';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MucLuyTien } from 'src/model/MucLuyTiens';
import { ServiceManagementService } from 'src/app/service-management/service-management.service';
import { MucLuyTienHoaDon } from 'src/model/MucLuyTienHoaDon';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit {
  dichVuId!: number;
  listOfData: HoaDon[] = [];
  listOfMucLuyTien: MucLuyTienHoaDon[] = [];
  listOfDichVu: DichVuHopDong[] = [];
  listPayment: any[] = [];
  isVisible = false;
  isVisiblePayment = false;
  submitted = false;
  form!: FormGroup;
  cash = 0;
  billIdPayment = 0;
  isVisibleDetail = false;

  soNuoc = 0
  soTien = 0;
  daThanhToan = 0;
  constructor(
    private route: ActivatedRoute,
    private service: CustomerManagementService,
    private service2: ServiceManagementService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.dichVuId = this.route.snapshot.params['id3'];
    this.form = this.fb.group({
      chiSoDongHo: ['', Validators.required],
      ngayTao: [
        { value: new Date().toLocaleDateString('en-GB'), disabled: true },
      ],
      dichVuHopDong: [this.dichVuId, Validators.required],
      chiSoKiTruoc: [{ value: 0, disabled: true }],
      ngayTaoKiTruoc: [{ value: '', disabled: true }],
    });
    this.getHoaDon();
  }

  getHoaDon() {
    this.service
      .getHoaDonByDichVu({
        id: this.dichVuId,
        tenDichVu: '',
        dichVuId: 0
      })
      .subscribe((res) => {
        this.listOfData = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
          'soapenv:Envelope'
        ]['soapenv:Body'].getHoaDonByDichVuHopDongResponse.getHoaDonByDichVuHopDongReturn;

        if (!Array.isArray(this.listOfData))
          this.listOfData = [this.listOfData];

        if (!this.listOfData[0]?.id) {
          this.listOfData = [];
        }
        this.listOfData = this.listOfData.map((item: any) => {
          return {
            id: item.id._text,
            chiSoDongHo: item.chiSoDongHo._text,
            chiSoTieuThu: item.chiSoTieuThu._text,
            soTien: item.soTien._text,
            ngayTao: item.ngayTao._text,
            soTienDaThanhToan: item.soTienDaThanhToan._text,
            bangGiaId: item.bangGia.id._text,
          };
        });
      });
  }

  showModalNew() {
    this.isVisible = true
    this.service
      .getLatestHoaDonByDichVuHopDong({
        id: this.form.get('dichVuHopDong')?.value,
        tenDichVu: '',
        dichVuId: 0
      })
      .subscribe((res) => {
        const result = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
          'soapenv:Envelope'
        ]['soapenv:Body'].getLatestHoaDonByDichVuHopDongResponse
          .getLatestHoaDonByDichVuHopDongReturn;

        this.form.patchValue({ chiSoKiTruoc: result.chiSoDongHo._text || 0 });
        this.form.patchValue({
          ngayTaoKiTruoc: new Date(result.ngayTao._text).toLocaleDateString(
            'en-GB'
          ),
        });
      });

  }

  handleCancel() {
    this.cash = 0
    this.isVisible = false;
    this.submitted = false;
    this.isVisiblePayment = false;
    this.isVisibleDetail = false;
    this.form.reset();
    this.form.patchValue({
      chiSoDongHo: '',
      ngayTao: new Date().toLocaleDateString('en-GB'),
      dichVuHopDong: this.dichVuId,
      chiSoKiTruoc: 0,
      ngayTaoKiTruoc: '',
    });
  }

  submit() {
    this.submitted = true;
    if(this.form.get('chiSoDongHo')?.value < this.form.get('chiSoKiTruoc')?.value) {
      this.notification.create(
        'error',
        'Lỗi',
        'Chỉ số kì này không được nhỏ hơn kì trước'
      );
      return
    }

    if (this.form.invalid) return;

    this.service
      .createHoaDon({
        chiSoDongHo: this.form.get('chiSoDongHo')?.value,
        dichVuHopDongId: this.form.get('dichVuHopDong')?.value,
        id: 0,
        soTien: 0,
        soTienDaThanhToan: 0,
        bangGiaId: 0,
        chiSoTieuThu: 0
      })
      .subscribe((res) => {
        const result = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
          'soapenv:Envelope'
        ]['soapenv:Body'].createHoaDonResponse.createHoaDonReturn._text;
        if (result === 'true') {
          this.notification.create(
            'success',
            'Thành công',
            'Đã lưu dịch vụ vào cơ sở dữ liệu'
          );
          this.getHoaDon();
        } else this.notification.create('error', 'Thất bại', 'Đã xảy ra lỗi');

        this.handleCancel();
      });
  }

  cashPayment() {
    this.service
      .createThanhToanTienMat({
        id: 0,
        phuongThuc: '',
        soTien: this.cash,
        ngayThanhToan: new Date(),
        hoaDonId: this.billIdPayment,
      })
      .subscribe((res) => {
        const result = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
          'soapenv:Envelope'
        ]['soapenv:Body'].createThanhToanTienMatResponse
          .createThanhToanTienMatReturn._text;
        if (result === 'true') {
          this.notification.create('success', 'Thành công', 'Đã lưu giao dịch');
          this.getHoaDon();
        } else
          this.notification.create(
            'error',
            'Lỗi',
            'Số tiền nhập vào cần lớn hơn 0'
          );
        this.isVisiblePayment = false;
      });
  }

  vnPayPayment() {
    this.service
      .getUrlVnPay({
        id: this.billIdPayment,
        soTien: 0,
        soTienDaThanhToan: 0,
        bangGiaId: 0,
        chiSoTieuThu: 0
      })
      .subscribe((res) => {
        localStorage.setItem('dichVuId', this.route.snapshot.params['id3']);
        localStorage.setItem('canHoId', this.route.snapshot.params['id2']);
        localStorage.setItem('khachHangId', this.route.snapshot.params['id']);
        const url = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
          'soapenv:Envelope'
        ]['soapenv:Body'].getUrlVnPayResponse.getUrlVnPayReturn._text;
        if (url) window.location.href = url;
      });
  }

  showModalPayment(billId: number) {
    this.isVisiblePayment = true;
    this.billIdPayment = billId;
  }

  showModalDetail(hoaDon: HoaDon) {
    this.soNuoc = hoaDon.chiSoTieuThu
    this.soTien = hoaDon.soTien
    this.daThanhToan = hoaDon.soTienDaThanhToan
    this.service
      .getThanhToanByHoaDon({
        id: hoaDon.id,
        soTien: 0,
        soTienDaThanhToan: 0,
        bangGiaId: 0,
        chiSoTieuThu: 0
      })
      .subscribe((res) => {
        this.listPayment = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
          'soapenv:Envelope'
        ]['soapenv:Body'].getByHoaDonResponse.getByHoaDonReturn;

        if (!Array.isArray(this.listPayment))
          this.listPayment = [this.listPayment];

        if (!this.listPayment[0]?.id) {
          this.listPayment = [];
        }
        this.isVisibleDetail = true;
      });

    this.service2
      .getChiTietHoaDon({
        id: hoaDon.id,
        soTien: 0,
        soTienDaThanhToan: 0,
        bangGiaId: 0,
        chiSoTieuThu: 0
      })
      .subscribe((res) => {
        this.listOfMucLuyTien = JSON.parse(
          xmlJs.xml2json(res, { compact: true })
        )['soapenv:Envelope'][
          'soapenv:Body'
        ].getChiTietHoaDonResponse.getChiTietHoaDonReturn;

        if (!Array.isArray(this.listOfMucLuyTien))
          this.listOfMucLuyTien = [this.listOfMucLuyTien];
        this.listOfMucLuyTien = this.listOfMucLuyTien.map((item: any) => {
          return {
            chiSoTieuThu: item.chiSoTieuThu._text,
            soTien: item.soTien._text,
            mucLuyTien: {
              donGia: item.mucLuyTien.donGia._text,
              gioiHan: item.mucLuyTien.gioiHan._text,
            }
          };
        });
      });
  }
}
