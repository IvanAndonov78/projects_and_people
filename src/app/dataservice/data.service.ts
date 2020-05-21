import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Company {
  id: string,
  name: string,
  business: string,
  slogan: string
}

export interface CompanyAddress {
  id: string,
  city: string,
  country: string,
  street: string,
  state: string,
  companyId: string
}

export interface Employee {
  id: string,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  companyId: string,
  jobTitle: string,
  jobArea: string,
  jobType: string
}

export interface Project {
  id: string,
  name: string,
  department: string,
  employeesId: string[],
  companyId: string
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  public getCompaniesData(): Observable<Company[]> {
    return this.http.get<Company[]>('./assets/data/companies.json');
  }

  public getCompanyAddressesData(): Observable<CompanyAddress[]> {
    
    return this.http.get<CompanyAddress[]>('./assets/data/company-addresses.json');
  }

  public getEmployeesData(): Observable<Employee[]> {
    return this.http.get<Employee[]>('./assets/data/employees.json');
  }

  public getProjectsData(): Observable<Project[]> {
    return this.http.get<Project[]>('./assets/data/projects.json');
  }

  
}

