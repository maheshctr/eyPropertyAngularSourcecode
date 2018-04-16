import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators  } from "@angular/forms";

import { AuthService } from "../../services/auth.service";
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public registerForm : FormGroup
  
  constructor
  (
    private router : Router,
    private fb : FormBuilder,
    private authService : AuthService
  ) 
  {
    this.registerForm = this.generateForm();
  }

  generateForm() : FormGroup
  {
    var form = this.fb.group
    ({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      userName : ['', Validators.required],
      email : ['', [Validators.required,Validators.email]],
      password : ['', Validators.required]
    });  
    return form;
  }

  registerUser() : void
  {
    this.authService.registerUser(this.registerForm.value).subscribe
    (
      success => 
      {
        swal('Success', 'User registered successfully', 'success');
        this.router.navigate(['/']);
      },
      error => 
      {
        console.log(error);
        swal('Error','error occurred','error');
      }
    );
  }

  login() : void
  {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
