import { Component, OnInit, ViewChild } from '@angular/core';
import {  } from "../../../../node_modules/@types/googlemaps";
import { ActivatedRoute } from "@angular/router";

import { PropertyViewModel } from '../../models/propertie-view-model';
import { PropertyServiceService } from '../../services/property-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-prop-details',
  templateUrl: './prop-details.component.html',
  styleUrls: ['./prop-details.component.css']
})
export class PropDetailsComponent implements OnInit {

  currentObj: any;
  myStyles : any;
  reviews  : any[];
  @ViewChild('gmap') gmapElement: any;
 
  constructor
  (
    private propService: PropertyServiceService
    , private currentUrl : ActivatedRoute
  ) 
  {
    this.reviews = [];
  }

  public property : PropertyViewModel;

  getPropertyDetails()
  {
    this.property = new PropertyViewModel();
    this.property.name = "SLS Splendor apartments";
    this.property.locality = "Bellandhur";
    this.property.cost = 40;
    this.property.imgUrl = "assets/images/desert.jpg";
    this.property.type = "1,2,3 BHK Flats";
    this.property.amenities.push({"title" : "Security", "details" : [{"name" : "Intercom facility"}]})
    this.property.amenities.push({"title" : "Entertainment", "details" : [{"name" : "Function Hall"}]})
    this.property.amenities.push({"title" : "Other", "details" : [{"name" : "Adult Pool"}]})
    this.property.amenities.push({"title" : "Sports", "details" : [{"name" : "Table tennis"}, {"name" : "Gymnasium"}]})
    this.property.gallery.push({"url":"assets/images/Desert.jpg"});
    this.property.gallery.push({"url":"assets/images/tulips.jpg"});
    this.property.gallery.push({"url":"assets/images/Desert.jpg"});
    this.property.gallery.push({"url":"assets/images/tulips.jpg"});
    this.property.specifications.push({"title":"Doors and Windows", "details": [{"name":"Glazed UPVC 3 trac sliding Windows"}]});
    this.property.specifications.push({"title":"Doors and Windows", "details": [{"name":"Glazed UPVC 3 trac sliding Windows"}]});
    this.property.specifications.push({"title":"Doors and Windows", "details": [{"name":"Glazed UPVC 3 trac sliding Windows"}]});
    this.property.builder = {"name" : "SLS builders","logoUrl":"assets/images/developer-logo.jpg","details":"Sumukha Constructions is a property development company with a vision for every square feet of land. When the investment in development meets our returns criteria we initiate the development process. Our focus is on building multi-functional residential apartments and villas. As on 1st June 2013, we have successfully completed developing 85,000 Sqft which includes our apartment namely \\\"Sumukha Greenville\\\" off Bannerghatta Road."};
    let propId = this.currentUrl.snapshot.paramMap.get('id');  
    if(propId != null && propId)
    {
      this.propService.getProperty(propId).subscribe
      (
        success =>
        {
          console.log(success);
          let obj = success.data;
          this.property.name = obj.name;
          this.property.type = obj.propertyType;
          this.property.cost = obj.cost;
          this.property.builder.name = obj.builder;
          this.property.imgUrl =  `url(${obj.imgUrl})`;
          for (let index = 0; index < 2; index++) {
            this.property.gallery.unshift( {"url": obj.imgUrl});
          }
          this.property.locality = obj.locality;
        },
        err => 
        {
          console.log(err);
          swal('Error',err, 'error');
        }
      );

    this.propService.getReviews(propId).subscribe
    (
      success => 
      {
        this.reviews = success.data;
        console.log(this.reviews);
      },
      err =>
      {
        console.log(err);
        swal('Error',err, 'error');
      }
    );

    }  
    
    
  }

  counterUpdate(event : object) 
  {
    console.log("refreshed");
    this.getPropertyDetails();
  }

  ngOnInit() 
  {
    this.getPropertyDetails();
    //console.log(this.property);
  }

}
