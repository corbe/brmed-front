import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AppService } from './app.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title= 'brmed-front';
  page: number = 1;
  total: number = 0;
  chartType:string = 'column';
  users:any;
  chart: Chart = this.init();

  constructor( private appService: AppService ) {
    this.init();
  }

  init():Chart {
    let chart = new Chart({
      chart: {
        type: this.chartType
      },
      title: {
        text: 'Cotação'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: []
      },
      series: []
    });
   // this.chart = chart;
    return chart;

  }

  getRates(): void {
    let series:any = []; 
    let name  = '';
    let date = '';
    let value = 0;
   
    this.chart = this.init();
    
    this.appService.getRates(this.page)
      .subscribe(res => {
        let results = res['results'];
        this.total = res['count'];
        this.users = results;

        for ( let r in results ) {
          date = results[r]['date'];
          this.chart['options']['xAxis']['categories'].push(date);
          series = [];
          for ( let i in results[r]['rate'] ) {
            name = results[r]['rate'][i]['currency']['name'];
            series.push({
              type: this.chartType,
              name: name,
              data: []
            });
          }
        }

        for ( let r in results ) {
          for ( let i in results[r]['rate'] ) {
            name = results[r]['rate'][i]['currency']['name'];
            value = results[r]['rate'][i]['value'];
            for (let s in series) {
              if ( name === series[s]['name'] ) {
                series[s]['data'].push(Number(value));
              }      
            }
          }
        }

        for (let s in series) {
          this.chart.addSeries(series[s], true,true);
        }
        
      });

  }
  
  ngOnInit() {
    let rates = this.getRates();
  }

  pageChangeEvent(page: number, sort: string = 'desc', order: string = 'created') {    
    this.page = page;
    this.getRates();
  }
}
