import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Settings } from "../shared/settings";

@Injectable()
export class DataService 
{
    private messageSource = new BehaviorSubject<any>({"test" : 2});
    currentObj = this.messageSource.asObservable();
    currentId : number;
    urlKey = "lastUrl";
    constructor() { }

    updateData(obj: any) 
    {
        console.log(obj);
        this.messageSource.next(obj);
    }

    updateCurrentId(newId : number)
    {
        this.currentId = newId;
    }


}