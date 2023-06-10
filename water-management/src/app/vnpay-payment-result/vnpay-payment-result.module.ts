import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VnpayPaymentResultComponent } from './vnpay-payment-result.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';

const routes: Routes = [
  {
    path: '',
    component: VnpayPaymentResultComponent,
  },
];

@NgModule({
  declarations: [VnpayPaymentResultComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzSpinModule,
    NzBreadCrumbModule,
    NzButtonModule,
  ],
})
export class VnpayPaymentResultModule {}
