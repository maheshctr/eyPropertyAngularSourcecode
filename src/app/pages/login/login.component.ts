import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute }  from '@angular/router';

import { AuthService } from "../../services/auth.service";
import swal from 'sweetalert2';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup
  closeBtnName  = "Close";
  constructor
  (
     private router : Router
    , private currentUrl : ActivatedRoute 
    , private fb : FormBuilder
    , private authService : AuthService
    , public bsModalRef: BsModalRef
  ) 
  {
    this.loginForm = this.generateForm();   
  }

  generateForm() : FormGroup
  {
    var form = this.fb.group
    ({
      userName : ['', Validators.required],
      password : [ '', Validators.required]
    });  
    return form;
  }

  doLogin() : void
  {
    this.authService.doLogin(this.loginForm.value).subscribe
    (
      success => 
      {
        this.authService.isAuthenticated = true;
        localStorage.setItem(this.authService.tokenStorageKey, success.obj.token);
        this.authService.userInfo = success.obj.data;
        localStorage.setItem(this.authService.userInfoStorageKey, JSON.stringify(success.obj.data));
        this.bsModalRef.hide();
        window.location.reload();
        //this.router.navigate(['/']);
      },
      error =>
      {
        swal('Error','Username or password is incorrect','error');
      }
    );
  }

  register() : void
  {
    this.bsModalRef.hide();
    this.router.navigate(['/register']);
  }


  ngOnInit() {
  }

}
