import { Component, OnInit } from '@angular/core';
import { DataService } from './../dataservice/data.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  // The state management in angular 2+ is just to
  // set values of needed variables: 
  companies;
  companyAddresses;
  companyProjects;
  companyAddress;
  companyProjectsArr;
  formdata;
  prjId;
  oldPrjName;
  newPrjName;

  // ---------------------------------------------

  ngOnInit() {
    this.getCompanies();
    this.getCompanyAddress();
    this.getCompanyProjects();
    this.formdata = new FormGroup({ 
      newPrjName: new FormControl("Enter a new project name if you wish .."),
    });
  }

  getCompanies() {
    this.dataservice.getCompaniesData().subscribe(companiesData => {
      this.companies = companiesData;
    });
  }

  getCompanyAddress() {
    this.dataservice.getCompanyAddressesData().subscribe(addressesData => {
      this.companyAddresses = addressesData;
    })
  }

  getCompanyProjects() {
    this.dataservice.getProjectsData().subscribe(projectsData => {
      this.companyProjects = projectsData;
    })
  }

  initModal(modSelector, closeSelector) {

    var ms = document.getElementById(modSelector);
    var cs = document.getElementById(closeSelector);
    ms.style.display = "block";

    cs.onclick = function() {
      ms.style.display = "none";
    }
  }

  hideModal(modSelector){
    var ms = document.getElementById(modSelector);
    ms.style.display = "none";
  }

  companyRowHandler(el) {
      
      if (el !== undefined && el !== null 
        && this.companyAddresses !== undefined 
        && this.companyAddresses !== null
        && this.companyProjects !== undefined
        && this.companyProjects !== null) {

          let resArr = [];
        
          this.companyAddresses.forEach(item => {
            
            if (item.companyId === el.id) {
              
              let obj = {companyId:'', address: '', projects: []};
              obj.companyId = item.companyId;
              obj.address = item.country + ', ' + item.state + ', ' + item.city + ', ' + item.street;
              resArr.push(obj);
            }

          })
          
          this.companyProjects.forEach(elem => {
            if (elem.companyId === el.id) {
              for (let i = 0; i < resArr.length; i++) {
                if (resArr[i].companyId === el.id) {
                  let currentPrj = {
                    id: '', 
                    name: '',
                    department: '',
                    employeesId: '',
                    companyId: ''
                  }
                  currentPrj.id = elem.id;
                  currentPrj.name= elem.name;
                  currentPrj.department = elem.department;
                  currentPrj.employeesId = elem.employeesId;
                  currentPrj.companyId = elem.companyId;

                  resArr[i].projects.push({currentPrj});
                }
              }
            }
          })

          let compAddress = resArr[0].address;
          let compProjectsArr = [];
          
          for (let i = 0; i < resArr[0].projects.length; i++) {
            compProjectsArr.push(resArr[0].projects[i].currentPrj);
          }

          this.companyAddress = compAddress;
          this.companyProjectsArr = compProjectsArr;
          console.log(this.companyProjectsArr);

          this.initModal("company-modal", "close-company-modal");
      }

  }

  prjRowHandler(prj) {
    if (prj !== undefined && prj !== null) {
      
      this.prjId = prj.id;
      this.oldPrjName = prj.name;
      this.initModal("prj-modal", "close-prj-modal");
    }
  }

  prjFormHandler(data) {
    this.newPrjName = data.newPrjName;
    this.changePrjName(this.prjId, this.newPrjName);
  }

  changePrjName(prjId, newPrjName) {
    if (prjId !== undefined && prjId !== null 
      && newPrjName !== undefined && newPrjName !== null) {
        this.companyProjectsArr.forEach((el, index) => {
          if (el.id === prjId) {
            this.companyProjectsArr[index].name = this.newPrjName;
          }
        })
    }
  }


}
