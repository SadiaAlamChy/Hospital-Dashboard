import { Component, OnInit } from '@angular/core';
import {QueryService} from "../../services/query.service";
import {ChartDataset, ChartOptions} from "chart.js";
import {query} from "@angular/animations";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-query5',
  templateUrl: './query5.component.html',
  styleUrls: ['./query5.component.css']
})
export class Query5Component implements OnInit {
  data_all: any[] = [];
  department: any[] = [];
  no_of_appointment: any[] = [];

  chartData: ChartDataset[] = [
    {
      type: "bar",
      label: 'Total Appointments',
      data: this.no_of_appointment,
    }
  ];
  chartLabels: string[] = this.department;

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
        display: true
      },

      tooltip: {
        // ⤵️ tooltip main styles
        backgroundColor: '#ffeaff',
        displayColors: true, // removes unnecessary legend
        padding: 10,

        // ⤵️ title
        titleColor: '#0b4ad2',
        titleFont: {
          size: 15
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
    this.getQuery5Data();
  }

  getQuery5Data(): void{
    this.queryService.getQuery5().subscribe((data:any)=>{
      console.log(data);
      //this.data_all.push(data)
      for(const d of data){
         //console.log(d.division, d.year, d.total_sale_price)
        this.department.push(d.department)
      //  this.year.push(d.year)
        this.no_of_appointment.push(d.no_of_appointment)

      }
      this.data_all = data

    })
  }

}
