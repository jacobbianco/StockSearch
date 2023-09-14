import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {MyServiceService} from "../my-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent {

  constructor(private apiData: MyServiceService, private route: ActivatedRoute) {
    this.query = route.snapshot.queryParamMap.get('query')
    this.getData()
    this.dataPoints = []
  }

  @Input() query?: string | null;

  apiError?: string;

  chartOptions?: any;

  dataPoints: Array<number>;

  change?: number;

  open?: number;

  close?: number;

  high?: number;

  low?: number;

  async getData() {
    this.apiData.getApiData(this.query?.toUpperCase()).then(c => {
      this.makeChart(c)
    }).catch(e => {
      console.log(e)
      this.apiError = 'You have exceeded the max amount of searches per minute. Please wait 1 minute before searching again'
    })
  }


  makeChart(c: any) {
    let j = 0
    Object.values(c.data["Time Series (Daily)"]).forEach(element => {
      if(j==0) {
        // @ts-ignore
        this.open = parseFloat(element['1. open']).toFixed(2)
        // @ts-ignore
        this.high = parseFloat(element['2. high']).toFixed(2)
        // @ts-ignore
        this.low = parseFloat(element['3. low']).toFixed(2)
        // @ts-ignore
        this.close = parseFloat(element['4. close']).toFixed(2)
        // @ts-ignore
        this.change = (((this.open - this.close) / this.open) * 100).toFixed(2)

      }
      j++
      // @ts-ignore
      this.dataPoints.push(element['4. close'])
      })

    let arr = [];
    for(let i: number = 0; i < 100; i++) arr[i]= '';

    this.dataPoints.reverse()

    // @ts-ignore
    this.chartOptions = {
      title: {
        text: c.data["Meta Data"]["2. Symbol"] + "(" + this.change + "%)",
      },
      xAxis: {
        type: 'category',
        data: arr,
        show: false
      },
      yAxis: {
        type: 'value',
        name: '$Price'
      },
      series: [
        {
          data: this.dataPoints,
          type: 'line'
      }
      ]
    }
  }
}
