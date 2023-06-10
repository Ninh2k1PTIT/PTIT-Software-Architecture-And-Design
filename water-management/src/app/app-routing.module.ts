import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'vnpay-result',
    loadChildren: () =>
      import('./vnpay-payment-result/vnpay-payment-result.module').then(
        (m) => m.VnpayPaymentResultModule
      ),
  },
  {
    path: 'service-management',
    loadChildren: () =>
      import('./service-management/service-management.module').then(
        (m) => m.ServiceManagementModule
      ),
  },
  {
    path: 'customer-management',
    loadChildren: () =>
      import('./customer-management/customer-management.module').then(
        (m) => m.CustomerManagementModule
      ),
  },
  {
    path: '',
    redirectTo: '/customer-management',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
