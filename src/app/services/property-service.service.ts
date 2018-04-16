import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Settings } from "../shared/settings";

@Injectable()
export class PropertyServiceService {

  constructor(private http : HttpClient, private router : Router) 
  {  }

  getProperties(searchQuery : string) : Observable<any>
  {
    var url = Settings.ApiBaseUrl + 'properties/';
    let body = {"searchQuery" : searchQuery};
    return this.http.post<any>(url, body);
  }
  getProperty(id : string) : Observable<any>
  {
    var url = Settings.ApiBaseUrl + 'properties/getData/' +id;
    let body = {"id" : id};
    return this.http.put(url,body);
  }

  addReview(reviewData : any) : Observable<any>
  {
    var url = Settings.ApiBaseUrl + 'properties/addReview';
    return this.http.post<any>(url, reviewData);
  }

  getReviews(propId : any) : Observable<any>
  {
    var url = Settings.ApiBaseUrl + 'properties/getReviews/' +propId;
    let body = {"id" : propId};
    return this.http.put<any>(url, body);
  }

}
