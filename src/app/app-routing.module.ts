import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInfoComponent } from './Pages/add-info/add-info.component';
import { ApplicantDataComponent } from './Pages/applicant-data/applicant-data.component';
import { ClientVistComponent } from './Pages/client-vist/client-vist.component';
import { DashbordComponent } from './Pages/dashbord/dashbord.component';
import { GuarantorDataComponent } from './Pages/guarantor-data/guarantor-data.component';
import { LoanRequestComponent } from './Pages/loan-request/loan-request.component';
import { MedisUploadComponent } from './Pages/medis-upload/medis-upload.component';
import { NetWorthComponent } from './Pages/net-worth/net-worth.component';
import { RiskOneComponent } from './Pages/risk-one/risk-one.component';
import { RiskTwoComponent } from './Pages/risk-two/risk-two.component';
import { SiteVistComponent } from './Pages/site-vist/site-vist.component';
import { ReportGenComponent } from './report-gen/report-gen.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashbord',
    pathMatch: 'full',
  },
  {
    path: 'dashbord',
    component: DashbordComponent,
  },
  {
    path: 'applicant-data',
    component: ApplicantDataComponent,
  },
  {
    path: 'applicant-data/:id',
    component: ApplicantDataComponent,
  },
  {
    path: 'guarantor-data/:id',
    component: GuarantorDataComponent,
  },
  {
    path: 'loan-request/:id',
    component: LoanRequestComponent,
  },
  {
    path: 'net-worth/:id',
    component: NetWorthComponent,
  },
  {
    path: 'client-vist/:id',
    component: ClientVistComponent,
  },
  {
    path: 'site-vist/:id',
    component: SiteVistComponent,
  },
  {
    path: 'risk-1/:id',
    component: RiskOneComponent,
  },
  {
    path: 'risk-2/:id',
    component: RiskTwoComponent,
  },
  {
    path: 'add-info/:id',
    component: AddInfoComponent,
  },
  {
    path: 'media-upload/:id',
    component: MedisUploadComponent,
  },
  {
    path: 'report/:id',
    component: ReportGenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
