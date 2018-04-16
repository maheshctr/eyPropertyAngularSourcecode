import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule  } from "@angular/router";
import { TooltipModule, BsDatepickerModule, BsDropdownModule, ModalModule } from 'ngx-bootstrap';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { HttpCallInterceptor } from './interceptors/http-interceptor';
import { PropListComponent } from './pages/prop-list/prop-list.component';
import { PropDetailsComponent } from './pages/prop-details/prop-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthGuard } from "./auth/auth-guard";
import { AuthService } from './services/auth.service';
import { ModalComponent } from './shared/modal/modal.component';
import { PropertyServiceService } from './services/property-service.service';
import { UserService } from './services/user.service';
import { DataService } from './services/data.service';
import { ModalDirective } from './directives/modal.directive';
import { BackgroundImage } from './directives/background-image';
import { ReviewComponent } from './pages/review/review.component';
//import {  } from "./models/index";


const appRoutes: Routes = 
[ 
  { path: '', component: PropListComponent }
  ,{ path: 'register', component: RegisterComponent }
  ,{ path: 'login', component: LoginComponent }
  ,{ path: 'details/:id', component: PropDetailsComponent }
  ,{ path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] }
]; 


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PropListComponent,
    PropDetailsComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    ModalComponent,
    ModalDirective,
    BackgroundImage,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,{onSameUrlNavigation:  "reload", useHash:  true}),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    AuthService,
    UserService,
    PropertyServiceService,
    DataService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpCallInterceptor, multi: true }
  ],
  entryComponents: [
    ReviewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
