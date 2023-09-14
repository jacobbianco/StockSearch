import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { MyServiceService } from "./my-service.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  siteName: string = 'StockSearch';
  query: string = '';

  constructor(private _router: Router, private apiData : MyServiceService) { }

  navigate(query: string) {
    if(query.trim().toLowerCase() == '' || query.trim().toLowerCase() == 'home') {
      this._router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this._router.navigate(['home']))
      this.query = '';
    }
    else {
      this.apiData.getApiData(query.trim().toUpperCase()).then(c => {
        if (c.data["Error Message"]) {
          this._router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this._router.navigate(['error'], {queryParams: {query: query}}))
          this.query = '';
        }
        else {
          this._router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this._router.navigate(['data'], {queryParams: {query: query}}))
          this.query = '';
        }})
  }
  }

}
