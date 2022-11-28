import { Component, OnInit } from '@angular/core';
import {QueryService} from "../../services/query.service";
import {ChartDataset, ChartOptions} from "chart.js";

@Component({
  selector: 'app-query2',
  templateUrl: './query2.component.html',
  styleUrls: ['./query2.component.css']
})
export class Query2Component implements OnInit {

  data_all:any[] = [];
  month: string[]  = [];
  total_patient: any[] = [];
  chartData: ChartDataset[] = [
    {
      type: "polarArea",
      label: 'Sales in Taka',
      data: this.total_patient,
    }
  ];
  chartLabels: string[] = this.month;
  chartOptions: ChartOptions = {

    // ⤵️ Fill the wrapper
    responsive: true,
    maintainAspectRatio: true,

    // ⤵️ Remove the grids
    // scales: {
    //   xAxis: {
    //     display: false,
    //     grid: {
    //       drawBorder: false // removes random border at bottom
    //     }
    //   },
    //   yAxis: {
    //     display: false
    //   }
    // },

    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'rgb(14,38,3)'
        }
      },

      tooltip: {
        // ⤵️ tooltip main styles
        backgroundColor: '#ffeaff',
        displayColors: false, // removes unnecessary legend
        padding: 10,

        // ⤵️ title
        titleColor: '#0b4ad2',
        titleFont: {
          size: 18
        },

        // ⤵️ body
        bodyColor: '#2D2F33',
        bodyFont: {
          size: 13
        }
      }
    }
  };

  constructor(private queryService: QueryService) { }

  ngOnInit(): void {
    this.getQuery2Data();
  }

  getQuery2Data(): void{
    this.queryService.getQuery2().subscribe((data:any)=>{
      console.log(data);
      for(const d of data){
        // console.log(d.name, d.sales)
        this.month.push(d.month)
        this.total_patient.push(d.total_patient)
      }
      this.data_all = data;
    })
}

}
