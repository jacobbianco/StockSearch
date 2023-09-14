import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MyServiceService} from "../my-service.service";

@Component({
  selector: 'app-custom-error',
  templateUrl: './custom-error.component.html',
  styleUrls: ['./custom-error.component.css']
})
export class CustomErrorComponent {

@Input() query?: string | null;


  constructor(private apiData: MyServiceService, private route: ActivatedRoute) {
    this.query = route.snapshot.queryParamMap.get('query')
  }
}
