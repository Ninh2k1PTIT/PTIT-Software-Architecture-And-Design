import { Component, OnInit } from '@angular/core';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { CustomerManagementService } from './customer-management.service';
import { KhachHang } from 'src/model/KhachHang';
import * as xmlJs from 'xml-js';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css'],
})
export class CustomerManagementComponent implements OnInit {
  listOfData: KhachHang[] = [];
  private readonly searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;
  constructor(private service: CustomerManagementService) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchQuery) => this.service.getKhachHangByTen(searchQuery))
      )
      .subscribe((res) => {
        this.listOfData = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
          'soapenv:Envelope'
        ]['soapenv:Body'].getKhachHangByTenResponse.getKhachHangByTenReturn;

        if (!Array.isArray(this.listOfData))
          this.listOfData = [this.listOfData];
        this.listOfData = this.listOfData.map((item: any) => {
          return {
            id: item.id._text,
            tenKhachHang: item.tenKhachHang._text,
          };
        });
      });
  }

  public onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  public ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }
}
