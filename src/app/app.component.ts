import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isDetailsPage : boolean;
  constructor
  (
    private router: Router,
    private dataService : DataService
  ) {}

  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        // example: NavigationStart, RoutesRecognized, NavigationEnd
        if (event instanceof NavigationStart) {
          if (event.url.indexOf("details") > 0) 
          {
            this.isDetailsPage = true;
          }
          else
          {
            this.isDetailsPage = false;
          }
        }
        if (event instanceof NavigationEnd) {
          this.dataService.updateCurrentId(event.id);
          console.log(event.id);
        }
      });
  }
}
