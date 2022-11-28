import { Component, OnInit } from '@angular/core';
import {QueryService} from "../../services/query.service";
import {ChartDataset, ChartOptions} from "chart.js";

@Component({
  selector: 'app-query8',
  templateUrl: './query8.component.html',
  styleUrls: ['./query8.component.css']
})
export class Query8Component implements OnInit {
  data_all: any[] = [];
  item_name: string[]  = [];
  quarter: any[]  = [];
  sum: any[] = [];

  chartData: ChartDataset[] = [
    {
      type: "radar",
      label: 'total sales on worst quarter',
      data: this.sum,
    }
  ];

  chartLabels: string[] = this.item_name;
  chartOptions: ChartOptions = {

    // ⤵️ Fill the wrapper
    responsive: true,
    maintainAspectRatio: true,

    // // ⤵️ Remove the grids
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
        display: true
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
    this.getQuery8Data();
  }

  getQuery8Data(): void{
    this.queryService.getQuery8().subscribe((data:any)=>{
      console.log(data);
      //this.data_all.push(data)
      for(const d of data){
        //console.log(d.division, d.year, d.total_sale_price)
        this.item_name.push(d.item_name)
        this.quarter.push(d.quarter)
        this.sum.push(d.sum)

      }
      this.data_all = data

    })
  }

}
