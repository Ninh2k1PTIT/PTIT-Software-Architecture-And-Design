import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerManagementService } from '../customer-management.service';
import { CanHo } from 'src/model/CanHo';
import * as xmlJs from 'xml-js';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css'],
})
export class ApartmentComponent implements OnInit {
  khachHangId!: number;
  listOfData: CanHo[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: CustomerManagementService
  ) {}

  ngOnInit(): void {
    this.khachHangId = this.route.snapshot.params['id'];

    this.service
      .getCanHoByKhachHang({
        id: this.khachHangId,
        tenKhachHang: '',
      })
      .subscribe((res) => {
        this.listOfData = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
          'soapenv:Envelope'
        ]['soapenv:Body'].getCanHoByKhachHangResponse.getCanHoByKhachHangReturn;

        if (!Array.isArray(this.listOfData))
          this.listOfData = [this.listOfData];
        this.listOfData = this.listOfData.map((item: any) => {
          return {
            id: item.id._text,
            diaChi: item.diaChi._text,
          };
        });
      });
  }
}
