//import { Component, OnInit } from '@angular/core';
//import {QueryService} from "../../services/query.service";
import {ChartDataset, ChartOptions, ChartType} from "chart.js";
import {Component, OnInit, NgModule} from '@angular/core';
//import {ChartDataset, ChartOptions, ChartType} from "chart.js";
import {query} from "@angular/animations";
import {HttpClient} from "@angular/common/http";
import { QueryService } from "src/app/services/query.service";
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-query10',
  templateUrl: './query10.component.html',
  styleUrls: ['./query10.component.css']
})
export class Query10Component implements OnInit {
  ngOnInit() {
    this.query10Data();
  }
  query10Data() {
    this.queryService.getQuery10().subscribe((data: any) => {
        console.log(data);
        // this.data_all.push(data);
        for(const d of data){
          // console.log(d.division, d.sales);
          this.store_key.push(d.store_key);
          this.average_sales.push(d.average_sales);
          this.month.push(d.month);
        }
        this.data_all = data;
      }
    )}
  data_all: any[] = [];
  store_key: string[] = [];
  month: any[] = [];
  average_sales: any[] = [];
  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartType: string = 'horizontalBar';
  public barChartLegend = true;

  public barChartData: ChartDataset[] = [

    { data: this.average_sales,
      label: 'S0001'
    },
  ]


  public barChartLabels: string[] = this.month;
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  constructor(private queryService: QueryService, private http: HttpClient) {
  }
}
