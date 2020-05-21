import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { EmployeeJobAreaComponent } from './employees/employee-job-area/employee-job-area.component';
import { EmployeeNameComponent } from './employees/employee-name/employee-name.component';

const routes: Routes = [
  { path: '', redirectTo: '/companyName', pathMatch: 'full' },
  { path: 'companyName', component: CompanyComponent },
  { path: 'companyName/employeeJobArea', component: EmployeeJobAreaComponent },
  { path: 'companyName/employeeJobArea/employeeName', component: EmployeeNameComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
