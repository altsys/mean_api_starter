import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Sales } from '../models/Sales';

@Injectable({
  providedIn: 'root',
})
export class SalesListService {

  constructor(private http: HttpClient) { }

  private serverApi = 'http://localhost:3000/api/v1';
  uri = `${this.serverApi}/sales`

  sales: Sales[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  /**
   * getAllSales
   */
  public getAllSales(): Observable<Sales[]> {
      return this.http.get<Sales[]>(this.uri);
  }

  /**
   * getSales
   */
  public getSales() : Observable<Sales[]> {
    return this.http.get<Sales[]>(this.uri);
  }
  /**
   * getSale
   */
  public getSale(id: String): Observable<Sales> {
    const uri = `${this.uri}/${id}`;
    return this.http.get<Sales>(uri);
  }

  /**
   * deleteSale
   */
  public deleteSale(id: String): Observable<Sales> {
    const uri = `${this.uri}/${id}`;
    return this.http.delete<Sales>(uri);
  }

  /**
   * updateSale
   */
  public updateSale(sale: Sales): Observable<any> {
    return this.http.patch(this.uri, sale, this.httpOptions);
  }

  /**
   * getSalesStat
   */
  public getSalesStat() {
    return this.http.get(`${this.uri}/stat`);
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {

  }

}
