import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BangGia } from 'src/model/BangGia';
import { DichVuNuoc } from 'src/model/DichVuNuoc';
import { HoaDon } from 'src/model/HoaDon';
import { MucLuyTien } from 'src/model/MucLuyTiens';

@Injectable({
  providedIn: 'root',
})
export class ServiceManagementService {
  constructor(private http: HttpClient) {}

  getAllDichVu() {
    return this.http.post(
      environment.dichVuNuocServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <getAllDichVu xmlns="http://dao" /> </soap:Body> </soap:Envelope>`,
      {
        responseType: 'text',
        headers: {
          SOAPAction: '',
        },
      }
    );
  }

  createDichVu(dichVuNuoc: DichVuNuoc) {
    return this.http.post(
      environment.dichVuNuocServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?> <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <createDichVu xmlns="http://dao"> <dichVu> <ghiChu>${dichVuNuoc.ghiChu}</ghiChu> <tenDichVu>${dichVuNuoc.tenDichVu}</tenDichVu> </dichVu> </createDichVu> </soap:Body> </soap:Envelope>`,
      {
        responseType: 'text',
        headers: {
          SOAPAction: '',
        },
      }
    );
  }

  saveBangGia(bangGia: BangGia) {
    return this.http.post(
      environment.dichVuNuocServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?> <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <saveBangGia xmlns="http://dao"> <bangGia> <dichVu> <id>${bangGia.dichVuNuocId}</id> </dichVu> </bangGia> </saveBangGia> </soap:Body> </soap:Envelope>`,
      {
        responseType: 'text',
        headers: {
          SOAPAction: '',
        },
      }
    );
  }

  saveMucLuyTiens(mucLuyTiens: MucLuyTien[]) {
    let s = '';
    mucLuyTiens.forEach((element) => {
      s += `<mucLuyTiens><bangGia><id>${element.bangGiaId}</id></bangGia><donGia>${element.donGia}</donGia><ghiChu>${element.ghiChu}</ghiChu><gioiHan>${element.gioiHan}</gioiHan></mucLuyTiens>`;
    });

    return this.http.post(
      environment.dichVuNuocServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?> <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <saveMucLuyTiens xmlns="http://dao">${s}</saveMucLuyTiens> </soap:Body> </soap:Envelope>`,
      {
        responseType: 'text',
        headers: {
          SOAPAction: '',
        },
      }
    );
  }

  getLatestBangGiaByDichVu(dichVuNuoc: DichVuNuoc) {
    return this.http.post(
      environment.dichVuNuocServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?> <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <getLatestBangGiaByDichVu xmlns="http://dao"> <dichVu> <id>${dichVuNuoc.id}</id> </dichVu> </getLatestBangGiaByDichVu> </soap:Body> </soap:Envelope>`,
      {
        responseType: 'text',
        headers: {
          SOAPAction: '',
        },
      }
    );
  }

  getAllMucLuyTienByBangGia(bangGia: BangGia) {
    return this.http.post(
      environment.dichVuNuocServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?> <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <getAllMucLuyTienByBangGia xmlns="http://dao"> <bangGia> <id>${bangGia.id}</id> </bangGia> </getAllMucLuyTienByBangGia> </soap:Body> </soap:Envelope> `,
      {
        responseType: 'text',
        headers: {
          SOAPAction: '',
        },
      }
    );
  }

  getChiTietHoaDon(hoaDon: HoaDon) {
    return this.http.post(
      environment.hoaDonServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <getChiTietHoaDon xmlns="http://dao">
            <hoaDon>
              <id>${hoaDon.id}</id>
            </hoaDon>
          </getChiTietHoaDon>
        </soap:Body>
      </soap:Envelope>`,
      {
        responseType: 'text',
        headers: {
          SOAPAction: '',
        },
      }
    );
  }

  getDichVu(dichVuNuoc: DichVuNuoc) {
    return this.http.post(
      environment.dichVuNuocServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?> <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <getDichVu xmlns="http://dao"> <dichVuNuoc> <id>${dichVuNuoc.id}</id> </dichVuNuoc> </getDichVu> </soap:Body> </soap:Envelope>`,
      {
        responseType: 'text',
        headers: {
          SOAPAction: '',
        },
      }
    );
  }

  updateDichVu(dichVuNuoc: DichVuNuoc) {
    return this.http.post(
      environment.dichVuNuocServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?> <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <updateDichVu xmlns="http://dao"> <dichVu> <ghiChu>${dichVuNuoc.ghiChu}</ghiChu> <id>${dichVuNuoc.id}</id> <tenDichVu>${dichVuNuoc.tenDichVu}</tenDichVu> </dichVu> </updateDichVu> </soap:Body> </soap:Envelope>`,
      {
        responseType: 'text',
        headers: {
          SOAPAction: '',
        },
      }
    );
  }

  getAllBangGiaByDichVu(dichVuNuoc: DichVuNuoc) {
    return this.http.post(
      environment.dichVuNuocServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?> <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <getAllBangGiaByDichVu xmlns="http://dao"> <dichVu> <id>${dichVuNuoc.id}</id> </dichVu> </getAllBangGiaByDichVu> </soap:Body> </soap:Envelope>`,
      {
        responseType: 'text',
        headers: {
          SOAPAction: '',
        },
      }
    );
  }
}
