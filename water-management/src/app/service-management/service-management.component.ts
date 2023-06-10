import { Component, OnInit } from '@angular/core';
import { ServiceManagementService } from './service-management.service';
import * as xmlJs from 'xml-js';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css'],
})
export class ServiceManagementComponent implements OnInit {
  data: any[] = [];
  constructor(private service: ServiceManagementService) {}

  ngOnInit(): void {
    this.service.getAllDichVu().subscribe((res) => {
      this.data = JSON.parse(xmlJs.xml2json(res, { compact: true }))[
        'soapenv:Envelope'
      ]['soapenv:Body'].getAllDichVuResponse.getAllDichVuReturn;

      if (!Array.isArray(this.data)) this.data = [this.data];
    });
  }
}
