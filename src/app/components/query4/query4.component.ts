import {Component, OnInit} from '@angular/core';
import {ChartDataset, ChartOptions} from "chart.js";
import {QueryService} from "../../services/query.service";
import {query} from "@angular/animations";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-query4',
  templateUrl: './query4.component.html',
  styleUrls: ['./query4.component.css']
})
export class Query4Component implements OnInit {

  data_all: any[] = [];
  day: any[] = [];
  no_of_appointment: any[] = [];
  //division: any[] = [];

  chartData: ChartDataset[] = [
    {
      type: "doughnut",
      label: 'Sales in Taka',
      data: this.no_of_appointment,
    }
  ];

  chartLabels: string[] = this.day;
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

  constructor(private queryService: QueryService, private http: HttpClient) {
  }

  ngOnInit() {
    this.query4Data();
  }

  query4Data(): void {
    this.queryService.getQuery4().subscribe((data: any) => {
        for (const d of data) {
          this.day.push(d.day)
          this.no_of_appointment.push(d.no_of_appointment)
         // this.division.push(d.division)
        }
        this.data_all = data;
      }
    )
  }

}
