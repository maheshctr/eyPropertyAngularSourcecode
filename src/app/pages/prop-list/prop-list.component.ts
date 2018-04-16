import { Component, OnInit } from '@angular/core';
import { Router  } from "@angular/router";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PropertyServiceService } from "../../services/property-service.service";
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-prop-list',
  templateUrl: './prop-list.component.html',
  styleUrls: ['./prop-list.component.css']
})
export class PropListComponent implements OnInit {

  constructor
  (
    private router : Router, 
    private propService : PropertyServiceService
    , private fb : FormBuilder
    , private data: DataService
  ) 
  {
    this.searchForm = this.generateForm(); 
  }

  public properties : any = [];
  public searchForm : FormGroup;
  public currentObj: any;

  goToPropertyDetails() : void
  {
    this.router.navigate(['details']);
  }

  getPropertyDetails(searchQuery : string) : void
  {
    //console.log(this.propService.getProperties());
    this.propService.getProperties(searchQuery).subscribe
    (
      success => 
      {
        console.log(success.data);
        this.properties = success.data;
      },
      error => 
      {
        console.log(error.data);
      }
    );
  }

  searchProp() : void
  {
    console.log(this.searchForm.value.searchQuery);
    this.getPropertyDetails(this.searchForm.value.searchQuery);
  }

  generateForm() : FormGroup
  {
    var form = this.fb.group
    ({
      searchQuery : ['']
    });  
    return form;
  }

  showDetails(propid : string) {
    const url = "/details/" + propid;
    this.router.navigate([url]);
  }
  
  ngOnInit() 
  {
    // let backUrl = localStorage.getItem(this.data.urlKey);
    // console.log(backUrl);
    // if (backUrl) 
    // {
    //   localStorage.removeItem(this.data.urlKey);
    //   this.router.navigate([backUrl]);  
    // }
    // else
    // {
    //   this.getPropertyDetails("");
    //   for (let index = 0; index < 10; index++) 
    //   {
    //     this.properties.push({"name" : "SLS Splendor apartments", "builder" : "SLS builders","locality" : "Bellandhur", "propertyType": "1,2,3 BHK Flats", "cost" : "40 Lac","rating":4,"imgUrl":"assets/images/tulips.jpg"});  
    //   }
    //   this.data.currentObj.subscribe(obj => this.currentObj = obj)
    // }

    this.getPropertyDetails("");
    for (let index = 0; index < 10; index++) 
    {
      this.properties.push({"name" : "SLS Splendor apartments", "builder" : "SLS builders","locality" : "Bellandhur", "propertyType": "1,2,3 BHK Flats", "cost" : "40 Lac","rating":4,"imgUrl":"assets/images/tulips.jpg"});  
    }
    
    
  }



}
