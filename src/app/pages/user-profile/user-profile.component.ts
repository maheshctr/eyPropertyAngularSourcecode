import { Component, OnInit } from '@angular/core';
import { Router  } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators  } from "@angular/forms";

import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { UserViewModel } from '../../models/user-view-model';
import swal from 'sweetalert2';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileForm : FormGroup
  userInfo : UserViewModel;
  
  constructor
  (
    private authService : AuthService, 
    private fb : FormBuilder, 
    private router : Router, 
    private userService : UserService 
  ) 
  {
    this.profileForm = this.generateForm(new UserViewModel());
  }

  generateForm(data : UserViewModel) : FormGroup
  {
    var form = this.fb.group
    ({
      firstName : [data.firstName, Validators.required],
      lastName : [data.lastName, Validators.required],
      userName : [data.userName, Validators.required],
      email : [data.email, [Validators.required,Validators.email]],
      password : [data.password, Validators.required]
    });

    return form;
  }

  getUserInfo() : void
  {
    this.userInfo = JSON.parse(localStorage.getItem(this.authService.userInfoStorageKey)) as UserViewModel;
    console.log(this.userInfo);
    this.profileForm = this.generateForm(this.userInfo);
  }

  updateProfile() : void
  {
    swal('Success','Details updated successfully','success');
    // this.userService.updateUserProfile('').subscribe
    // (
    //   success => 
    //   {
    //     swal('Success','Details updated successfully','success');
    //   },
    //   error => 
    //   {
    //     swal('Errro','Details updated successfully','error');
    //   }
    // );
  }

  ngOnInit() {
    this.getUserInfo();
  }

}
