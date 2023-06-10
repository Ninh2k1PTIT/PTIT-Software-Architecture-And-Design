import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceManagementComponent } from './service-management.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EditComponent } from './edit/edit.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { DetailComponent } from './detail/detail.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzInputModule } from 'ng-zorro-antd/input';

const routes: Routes = [
  {
    path: '',
    component: ServiceManagementComponent,
  },
  {
    path: 'create',
    component: EditComponent,
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
  },
];

@NgModule({
  declarations: [ServiceManagementComponent, EditComponent, DetailComponent],
  imports: [
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
  ],
})
export class ServiceManagementModule {}
