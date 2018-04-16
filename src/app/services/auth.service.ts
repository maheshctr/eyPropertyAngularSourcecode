import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Settings } from "../shared/settings";

@Injectable()
export class AuthService {

    public tokenStorageKey : string = "tokenKey";
    public userInfoStorageKey : string = 'userInfo';
    public userInfo : any
    public isAuthenticated : boolean = false;

    constructor(private http : HttpClient, private router : Router) 
    {
        this.isAuthenticated = (this.getToken() ? true : false );
    }

    getToken() : any
    {
        var token = localStorage.getItem(this.tokenStorageKey);
        if(token)
        {
            return token;
        }
        return undefined;
    }

    getUserInfo() : any
    {
        return JSON.parse(localStorage.getItem(this.userInfoStorageKey));
    }

    doLogin(loginCredentials : any) : Observable<any>
    {
        var url = Settings.ApiBaseUrl + 'auth/login';
        return this.http.post<any>(url, loginCredentials);
    }

    doLogout():void
    {
        localStorage.removeItem(this.tokenStorageKey);
        localStorage.clear();
        this.isAuthenticated = false;
        window.location.reload();
        //this.router.navigate(['/']);
    }

    registerUser(userData : any) : Observable<any>
    {
        var url = Settings.ApiBaseUrl + 'auth/register';
        return this.http.post<any>(url, userData);
    }


}