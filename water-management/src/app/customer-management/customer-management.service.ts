import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CanHo } from 'src/model/CanHo';
import { DichVuHopDong } from 'src/model/DichVuHopDong';
import { HoaDon } from 'src/model/HoaDon';
import { KhachHang } from 'src/model/KhachHang';
import { ThanhToan } from 'src/model/ThanhToan';

@Injectable({
  providedIn: 'root',
})
export class CustomerManagementService {
  constructor(private http: HttpClient) { }

  getKhachHangByTen(ten: string) {
    return this.http.post(
      environment.khachHangServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body> 
            <getKhachHangByTen xmlns="http://dao"> 
              <key>${ten}</key>
            </getKhachHangByTen> 
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

  getCanHoByKhachHang(khachHang: KhachHang) {
    return this.http.post(
      environment.khachHangServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?> 
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <getCanHoByKhachHang xmlns="http://dao">
            <khachHang>
              <id>${khachHang.id}</id>
            </khachHang> 
          </getCanHoByKhachHang>
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

  getHoaDonByDichVu(dichVuHopDong: DichVuHopDong) {
    return this.http.post(
      environment.hoaDonServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <getHoaDonByDichVuHopDong xmlns="http://dao">
            <dichVuHopDong>
              <dichVuNuoc>
              </dichVuNuoc>
              <hopDong>
              </hopDong>
              <id>${dichVuHopDong.id}</id>
            </dichVuHopDong>
          </getHoaDonByDichVuHopDong>
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

  getDichVuByCanHo(canHo: CanHo) {
    return this.http.post(
      environment.dichVuNuocServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <getDichVuByCanHo xmlns="http://dao">
            <canHo>
              <diaChi>string</diaChi>
              <id>${canHo.id}</id>
            </canHo>
          </getDichVuByCanHo>
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



  getLatestHoaDonByDichVuHopDong(dichVuHopDong: DichVuHopDong) {
    return this.http.post(
      environment.hoaDonServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <getLatestHoaDonByDichVuHopDong xmlns="http://dao">
            <dichVuHopDong>
              <id>${dichVuHopDong.id}</id>
            </dichVuHopDong>
          </getLatestHoaDonByDichVuHopDong>
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

  createHoaDon(hoaDon: HoaDon) {
    return this.http.post(
      environment.hoaDonServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <createHoaDon xmlns="http://dao">
              <hoaDon>
                <chiSoDongHo>${hoaDon.chiSoDongHo}</chiSoDongHo>
                <dichVuHopDong>
                  <id>${hoaDon.dichVuHopDongId}</id>
                </dichVuHopDong>
              </hoaDon>
            </createHoaDon>
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

  createThanhToanTienMat(thanhToan: ThanhToan) {
    return this.http.post(
      environment.thanhToanServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body> 
            <createThanhToanTienMat xmlns="http://dao">
              <thanhToan>
                <hoaDon>
                  <id>${thanhToan.hoaDonId}</id>
                </hoaDon>
                <soTien>${thanhToan.soTien}</soTien>
              </thanhToan>
            </createThanhToanTienMat>
          </soap:Body>
        </soap:Envelope> `,
      {
        responseType: 'text',
        headers: {
          SOAPAction: '',
        },
      }
    );
  }

  getUrlVnPay(hoaDon: HoaDon) {
    return this.http.post(
      environment.thanhToanServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <getUrlVnPay xmlns="http://dao">
            <hoaDon>
              <id>${hoaDon.id}</id>
            </hoaDon>
          </getUrlVnPay>
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

  createThanhToanVnPay(thanhToan: ThanhToan) {
    return this.http.post(
      environment.thanhToanServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
              <createThanhToanVnPay xmlns="http://dao">
                <thanhToan>
                  <hoaDon>
                    <id>${thanhToan.hoaDonId}</id>
                  </hoaDon>
                  <urlThanhToan>${thanhToan.url}</urlThanhToan> 
                </thanhToan> 
              </createThanhToanVnPay> 
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

  getThanhToanByHoaDon(hoaDon: HoaDon) {
    return this.http.post(
      environment.thanhToanServiceUrl,
      `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <getByHoaDon xmlns="http://dao">
              <hoaDon>
                <id>${hoaDon.id}</id>
              </hoaDon>
            </getByHoaDon>
          </soap:Body>
        </soap:Envelope> `,
      {
        responseType: 'text',
        headers: {
          SOAPAction: '',
        },
      }
    );
  }
}
