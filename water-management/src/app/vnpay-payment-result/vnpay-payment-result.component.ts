import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as xmlJs from 'xml-js';
import { CustomerManagementService } from '../customer-management/customer-management.service';

@Component({
  selector: 'app-vnpay-payment-result',
  templateUrl: './vnpay-payment-result.component.html',
  styleUrls: ['./vnpay-payment-result.component.css'],
})
export class VnpayPaymentResultComponent implements OnInit {
  returnUrl = '';
  returnParams = {};
  loading = true;
  results = {
    images: '',
    status: '',
    amount: 0,
    billId: '',
    transactionNo: '',
  };
  constructor(
    private route: ActivatedRoute,
    private service: CustomerManagementService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.returnUrl = decodeURI(
      window.location.href
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
    );

    this.route.queryParams.subscribe((param) => {
      this.service
        .createThanhToanVnPay({
          id: 0,
          phuongThuc: '',
          soTien: 0,
          ngayThanhToan: new Date(),
          hoaDonId: param['vnp_OrderInfo'],
          url: this.returnUrl,
        })
        .subscribe((res) => {
          const result = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
            'soapenv:Envelope'
          ]['soapenv:Body'].createThanhToanVnPayResponse
            .createThanhToanVnPayReturn._text;
          if (result === 'true')
            this.results = {
              images: 'assets/confirm-svgrepo-com.svg',
              status: 'Thanh toán thành công',
              amount: param['vnp_Amount'] / 100,
              billId: param['vnp_OrderInfo'],
              transactionNo: param['vnp_TransactionNo'],
            };
          else
            this.results = {
              images: 'assets/cancel-error-svgrepo-com.svg',
              status: 'Thanh toán thất bại',
              amount: param['vnp_Amount'] / 100,
              billId: param['vnp_OrderInfo'],
              transactionNo: param['vnp_TransactionNo'],
            };
          this.loading = false;
        });
    });
  }

  back() {
    this.router.navigate([
      `/customer-management/${localStorage.getItem(
        'khachHangId'
      )}/apartment/${localStorage.getItem('canHoId')}/service/${localStorage.getItem('dichVuId')}/bill`,
    ]);
  }
}
