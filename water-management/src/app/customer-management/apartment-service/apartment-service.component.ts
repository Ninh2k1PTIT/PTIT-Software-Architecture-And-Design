import { Component, OnInit } from '@angular/core';
import { CustomerManagementService } from '../customer-management.service';
import { ActivatedRoute } from '@angular/router';
import * as xmlJs from 'xml-js';
import { DichVuHopDong } from 'src/model/DichVuHopDong';

@Component({
  selector: 'app-apartment-service',
  templateUrl: './apartment-service.component.html',
  styleUrls: ['./apartment-service.component.css']
})
export class ApartmentServiceComponent implements OnInit {
  canHoId!: number
  data: DichVuHopDong[] = []
  constructor(private service: CustomerManagementService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.canHoId = this.route.snapshot.params['id2'];
    this.service
      .getDichVuByCanHo({
        id: this.canHoId,
      })
      .subscribe((res) => {
        this.data = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
          'soapenv:Envelope'
        ]['soapenv:Body'].getDichVuByCanHoResponse.getDichVuByCanHoReturn;

        if (!Array.isArray(this.data))
          this.data = [this.data];
        this.data = this.data.map((item: any) => {
          return {
            id: item.id._text,
            dichVuId: item.dichVuNuoc.id._text,
            tenDichVu: item.dichVuNuoc.tenDichVu._text,
          };
        });
      });
  }

}
