import { Component, OnInit } from '@angular/core';
import { IntegerType } from 'mongodb';
import { Sales } from '../models/Sales';
import { SalesListService } from '../services/sales-list.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss'],
})
export class SalesListComponent implements OnInit {
  salesList: Sales[] = [];
  sale: any;

  constructor(private salesListService: SalesListService) {}

  viewSale(sale: Sales) {
    console.log('I will show');
  }

  deleteSale(sale: Sales) {
    console.log('I will delete');

    // this.salesList = this.salesListServ.deleteSale(sale._id?).subscribe();
  }

  ngOnInit(): void {
    this.getSales();
  }

  /**
   * getSales
   */
  public getSales() {
    this.salesListService.getAllSales().subscribe((sales) => {
      this.salesList = sales;
    });
  }
}
