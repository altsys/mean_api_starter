import { Component, OnInit } from '@angular/core';
import { Sales } from '../models/Sales';
import { SalesListService } from '../services/sales-list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sales: Sales[] = [];

  constructor(private salesService: SalesListService) { }

  ngOnInit(): void {
    this.getSales();
  }

    /**
   * getSales
   */
     public getSales() {
      this.salesService.getAllSales().subscribe((sales) => {
        this.sales = sales;
      });
    }
}
