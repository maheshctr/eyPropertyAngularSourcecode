import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute }  from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';

import { AuthService } from "../../services/auth.service";
import swal from 'sweetalert2';
import { PropertyServiceService } from '../../services/property-service.service';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  public reviewForm : FormGroup
  closeBtnName  = "Close";
  reviews  : any[];
  @Output() refreshEvent = new EventEmitter();
  constructor
  (
     private router : Router
    , private currentUrl : ActivatedRoute 
    , private fb : FormBuilder
    , private authService : AuthService
    , public bsModalRef: BsModalRef
    , private propService : PropertyServiceService,
    private dataService : DataService
  ) 
  {
    this.reviewForm = this.generateForm();   
  }

  generateForm() : FormGroup
  {
    var form = this.fb.group
    ({
      title : ['', Validators.required],
      description : [ '', Validators.required]
    });  
    return form;
  }

  submitReview() : void
  {
    let userInfo = this.authService.getUserInfo();
    let data = this.reviewForm.value;
    data.propertyId = this.getPropertyId();
    data.by = userInfo.email;

    this.propService.addReview(this.reviewForm.value).subscribe
    (
      success => 
      {
        this.bsModalRef.hide();
        window.location.reload();
        //localStorage.setItem(this.dataService.urlKey, this.router.url);
        //this.router.navigate(['/']);
      },
      err =>
      {
        console.log(err);
        swal('Error',err, 'error');
      }
    );
  }

  getPropertyId() : string
  {
    let url = this.router.url;
    let urlElements = url.split('/');
    let id = urlElements[urlElements.length-1];
    return id;
  }

  ngOnInit() 
  {
    // console.log(window.location);
    // console.log(this.currentUrl.snapshot);
    // console.log( this.router.url);
    
   
  }

}
