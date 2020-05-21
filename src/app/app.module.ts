import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './dataservice/data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { EmployeeJobAreaComponent } from './employees/employee-job-area/employee-job-area.component';
import { EmployeeNameComponent } from './employees/employee-name/employee-name.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    EmployeeNameComponent,
    EmployeeJobAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
