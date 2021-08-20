import { Component, OnInit } from '@angular/core';
import { Sales } from '../models/Sales';
import { SalesListService } from '../services/sales-list.service';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stat: any | undefined;

  constructor(private salesService: SalesListService) { }

  ngOnInit(): void {
    this.getSalesStat();
  }

    /**
   * getSales
   */
     public getSalesStat() {
      this.salesService.getSalesStat().subscribe((stat) => {
        this.stat = stat;
      });
    }
}
