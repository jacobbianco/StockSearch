import { Injectable } from '@angular/core';
import {from} from "rxjs";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  async getApiData (sym: string | undefined){
    console.log(sym)
    let d = await axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + sym + "&interval=5min&apikey=HTLI0WAQCZ0WX8XY\';\n");
    return d;
  }
  constructor() {}

}
