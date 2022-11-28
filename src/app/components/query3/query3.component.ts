import {Component, OnInit} from '@angular/core';
import {ChartDataset, ChartOptions} from "chart.js";
import {QueryService} from "../../services/query.service";
import {query} from "@angular/animations";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-query3',
  templateUrl: './query3.component.html',
  styleUrls: ['./query3.component.css']
})
export class Query3Component implements OnInit {

  data_all: any[] = [];
  day: any[] = [];
  total_sales: any[] = [];

  chartData: ChartDataset[] = [
    {
      type: "bar",
      label: 'Total Sales in Taka',
      data: this.total_sales,
    }
  ];
  chartLabels: string[] = this.day;
  chartOptions: ChartOptions = {

    // ⤵️ Fill the wrapper
    responsive: true,
    maintainAspectRatio: true,



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
    this.query3Data();
  }

  query3Data(): void {
    this.queryService.getQuery3().subscribe((data: any) => {
        for (const d of data) {
          this.day.push(d.day)
          this.total_sales.push(d.total_sales)
        }
        this.data_all = data;
      }
    )
  }

}
