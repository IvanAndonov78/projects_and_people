import { Component, OnInit } from '@angular/core';
import { DataService } from './../../dataservice/data.service';
import { CompanyComponent } from 'src/app/company/company.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee-name',
  templateUrl: './employee-name.component.html',
  styleUrls: ['./employee-name.component.css']
})
export class EmployeeNameComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  company = new CompanyComponent(this.dataservice); 
  employees;
  projects;
  employeeAndProjects;
  employeeProjectsToStr;
  personId;

  //form-controls:
  formdata;
  id;
  firstName;
  lastName;
  dateOfBirth;
  companyId;
  jobTitle;
  jobArea;
  jobType;

  ngOnInit() {
    this.getEmployees();
    this.getProjects();
    this.formdata = new FormGroup({ 
      id: new FormControl("Enter employee's id .."),
      firstName: new FormControl("Enter employee's firstName .."),
      lastName: new FormControl("Enter employee's lastName .."),
      dateOfBirth: new FormControl("Enter employee's dateOfBirth .."),
      companyId: new FormControl("Enter employee's companyId .."),
      jobTitle: new FormControl("Enter employee's jobTitle .."),
      jobArea: new FormControl("Enter employee's jobArea .."),
      jobType: new FormControl("Enter employee's jobType ..")
    });
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

  employeeRowHandler(person) {

    if (person !== undefined && person !== null
        && this.employees !== undefined && this.employees !== null
        && this.projects !== undefined && this.projects !== null) {

        let resArrSinglePerson = [];

        this.employees.forEach(p => {
          if (person.id === p.id) {
            let obj = {
              id: '',
              firstName: '',
              lastName: '',
              dateOfBirth: '',
              companyId: '',
              jobTitle: '',
              jobArea: '',
              jobType: '',
              emplProjects: [],
            };

            obj.id = p.id,
            obj.firstName = p.firstName,
            obj.lastName = p.lastName,
            obj.dateOfBirth = p.dateOfBirth,
            obj.companyId = p.companyId,
            obj.jobTitle = p.jobTitle,
            obj.jobArea = p.jobArea,
            obj.jobType = p.jobType,
            obj.emplProjects = []

            resArrSinglePerson.push({obj});
          }
        })         
        
        this.projects.forEach(prj => {

          for (let j = 0; j < prj.employeesId.length; j++) {
            if (person.id === prj.employeesId[j]) {
              let prjId = prj.id;
              let prjName = prj.name;
              resArrSinglePerson[0].obj.emplProjects.push({prjId: prjId, prjName: prjName});
            }
          }
        }) 

        this.employeeAndProjects = resArrSinglePerson[0].obj;
        //console.log(this.employeeAndProjects);

        let str = '';

        for (let i = 0; i < resArrSinglePerson[0].obj.emplProjects.length; i++) {
          str += resArrSinglePerson[0].obj.emplProjects[i].prjName;
          if (i < resArrSinglePerson[0].obj.emplProjects.length - 1) {
            str += '; ';
          }
        }

        this.employeeProjectsToStr = str;
        console.log(this.employeeProjectsToStr);

        this.company.initModal("employee-modal", "close-employee-modal");
    }
  }

  del(person) {

    if (person !== undefined && person !== null) {

      let tempArr = this.employees;

      tempArr.forEach((el, index) => {
        if (el.id === person.id) {
          delete this.employees[index];
        }
      })

      this.employees = tempArr;

      alert('Deleted item with id: ' + person.id);

    }
  }

  initAddModal() {
    let c = new CompanyComponent(this.dataservice);
    c.initModal("employee-add-modal", "close-employee-add-modal");
  }

  employeeFormHandler(data) {

    let dataArr = [
      { id: data.id },
      { firstName: data.firstName },
      { lastName: data.lastName },
      { dateOfBirth: data.dateOfBirth },
      { companyId: data.companyId },
      { jobTitle: data.jobTitle },
      { jobArea: data.jobArea },
      { jobType: data.jobType }
    ];

    alert(
      'A new employee is added as following: '
      + ' First name: ' + dataArr[1].firstName
      + ' Last name: ' + dataArr[2].lastName
    );

    this.employees.push(data);

  }

}
