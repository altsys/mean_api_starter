import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Sales } from '../models/Sales';
import { SalesListService } from '../services/sales-list.service';

@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.component.html',
  styleUrls: ['./sales-detail.component.scss']
})
export class SalesDetailComponent implements OnInit {
  sale: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private salesService: SalesListService,
    private location: Location
  ) { }

  /**
   * getSale
   */
  public getSale() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.salesService.getSale(id).subscribe(sale =>
      this.sale = sale
    );
  }
  ngOnInit(): void {
    this.getSale();
  }

}
