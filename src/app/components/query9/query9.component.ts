import { Component, OnInit } from '@angular/core';
import {QueryService} from "../../services/query.service";

@Component({
  selector: 'app-query9',
  templateUrl: './query9.component.html',
  styleUrls: ['./query9.component.css']
})
export class Query9Component implements OnInit {
  data_all: any[] = [];
  Item: string[]  = [];
  Division: string[]  = [];
  Sales: any[] = [];

  constructor(private queryService: QueryService) { }

  ngOnInit(): void {
    this.getQuery9Data();
  }

  getQuery9Data(): void{
    this.queryService.getQuery9().subscribe((data:any)=>{
      console.log(data);
      //this.data_all.push(data)
      for(const d of data){
        //console.log(d.division, d.year, d.total_sale_price)
        this.Item.push(d.Item)
        this.Division.push(d.Division)
        this.Sales.push(d.Sales)

      }
      this.data_all = data

    })
  }

}
