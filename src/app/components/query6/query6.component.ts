import { Component, OnInit } from '@angular/core';
import {QueryService} from "../../services/query.service";
import {ChartDataset, ChartOptions} from "chart.js";
import {isArray} from "chart.js/types/helpers";

@Component({
  selector: 'app-query6',
  templateUrl: './query6.component.html',
  styleUrls: ['./query6.component.css']
})
export class Query6Component implements OnInit {
  data_all: any[] = [];
  store_key: any[]  = [];
  items: any[] = [];
  item_name: any[] = []
  chartData: ChartDataset[] = [
    {
      type: "bar",
      label: 'Sales in Taka',
      data: this.store_key,
    }
  ];

  chartLabels: any[] = this.item_name;
  chartOptions: ChartOptions = {

    // ⤵️ Fill the wrapper
    responsive: true,
    maintainAspectRatio: true,

    // ⤵️ Remove the grids
    scales: {
      xAxis: {
        display: true,
        grid: {
          drawBorder: true // removes random border at bottom
        }
      },
      yAxis: {
        display: true
      }
    },

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
    this.getQuery6Data();
  }

   getQuery6Data(): void{
    this.queryService.getQuery6().subscribe((data:any)=>{

      console.log(data);
      this.data_all.push(data)
      for(const d of data){
        for(const a of d.items)
        {
          console.log(a.item_name)
          // this.item_name.push(a.item_name)

        }
        console.log(d.store_key, d.items)
        this.store_key.push(d.store_key)
        this.items.push(d.items)


      }
      this.data_all = data

    })
  }

}
