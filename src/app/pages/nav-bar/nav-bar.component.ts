import { Component, OnInit,Input  } from '@angular/core';
import swal from 'sweetalert2';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router, ActivatedRoute  } from "@angular/router";

import { LoginComponent } from '../login/login.component';
import { AuthService } from "../../services/auth.service";
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  bsModalRef: BsModalRef;
  userInfo : any;
  @Input() isDetailsPage: boolean;
  
  constructor(private modalService: BsModalService, private router : Router, private currentUrl : ActivatedRoute, private authSerivce : AuthService) 
  {
    this.userInfo = this.authSerivce.getUserInfo();
    console.log(window.location.href);
    //console.log(this.currentUrl.snapshot.url);
    if(!this.userInfo)
    {
      this.showNavbar = false;
    }
    else
    {
      this.showNavbar = true;
    }
    
  }

  brandName : string = "Magic Properties"
  showNavbar : boolean;

  logout():void
  {
    this.authSerivce.doLogout();
  }

  showLogin() : void
  {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(LoginComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  showReview() : void
  {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(ReviewComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  ngOnInit() 
  {

  }

}
