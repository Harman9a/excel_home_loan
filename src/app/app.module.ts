import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashbordComponent } from './Pages/dashbord/dashbord.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SideNavComponent } from './Components/side-nav/side-nav.component';
import { ApplicantDataComponent } from './Pages/applicant-data/applicant-data.component';
import { GuarantorDataComponent } from './Pages/guarantor-data/guarantor-data.component';
import { LoanRequestComponent } from './Pages/loan-request/loan-request.component';
import { NetWorthComponent } from './Pages/net-worth/net-worth.component';
import { ClientVistComponent } from './Pages/client-vist/client-vist.component';
import { SiteVistComponent } from './Pages/site-vist/site-vist.component';
import { RiskOneComponent } from './Pages/risk-one/risk-one.component';
import { RiskTwoComponent } from './Pages/risk-two/risk-two.component';
import { AddInfoComponent } from './Pages/add-info/add-info.component';
import { MedisUploadComponent } from './Pages/medis-upload/medis-upload.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReportGenComponent } from './report-gen/report-gen.component';
import { ScoreComponent } from './Pages/score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    ApplicantDataComponent,
    GuarantorDataComponent,
    LoanRequestComponent,
    NetWorthComponent,
    ClientVistComponent,
    SiteVistComponent,
    RiskOneComponent,
    RiskTwoComponent,
    AddInfoComponent,
    MedisUploadComponent,
    ReportGenComponent,
    ScoreComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
