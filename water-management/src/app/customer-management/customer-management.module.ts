import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManagementComponent } from './customer-management.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ApartmentComponent } from './apartment/apartment.component';
import { BillComponent } from './bill/bill.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ApartmentServiceComponent } from './apartment-service/apartment-service.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerManagementComponent,
  },
  {
    path: ':id/apartment',
    component: ApartmentComponent,
  },
  {
    path: ':id/apartment/:id2/service',
    component: ApartmentServiceComponent,
  },
  {
    path: ':id/apartment/:id2/service/:id3/bill',
    component: BillComponent,
  },
];

@NgModule({
  declarations: [
    CustomerManagementComponent,
    ApartmentComponent,
    BillComponent,
    ApartmentServiceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonModule,
    NzTableModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzModalModule,
    FormsModule,
    RouterModule.forChild(routes),
    NzInputNumberModule,
    NzNotificationModule,
    NzIconModule,
    ReactiveFormsModule,
    NzTypographyModule,
    NzTabsModule,
    NzToolTipModule,
    NzInputModule,
    NzSelectModule
  ],
})
export class CustomerManagementModule {}
