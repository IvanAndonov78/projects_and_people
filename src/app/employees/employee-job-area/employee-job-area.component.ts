import { Component, OnInit } from '@angular/core';
import { DataService } from './../../dataservice/data.service';

@Component({
  selector: 'app-employee-job-area',
  templateUrl: './employee-job-area.component.html',
  styleUrls: ['./employee-job-area.component.css']
})
export class EmployeeJobAreaComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  projects; 
  employees;

  ngOnInit() {
    this.getProjects();
    this.getEmployees();
  }

  getEmployees() {
    this.dataservice.getEmployeesData().subscribe(emplData => {
      this.employees = emplData;
    });
  }

  getProjects() {
    this.dataservice.getProjectsData().subscribe(prjData => {
      this.projects = prjData;
    })
  }

  jobRowHandler() {
    alert(
      'This is the only section (for the last point of the project) with status IN PROGRESS :)'
      + ' Please, see the other categories from the Navbar - '
      + ' Company name & Employee name which should work properly!'
    );
  }


}
