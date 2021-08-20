import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['No.', 'Customer Email', 'Store Location', 'Purchase Method', 'Product Count', 'Coupon Used', 'Sales Date', 'Make Changes'];
  dataSource!: MatTableDataSource<Sales>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private salesListService: SalesListService) {
    this.dataSource = new MatTableDataSource(this.salesList);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getSales();
  }

  deleteSale(sale: Sales) {
    this.salesListService.deleteSale(sale._id).subscribe();
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
