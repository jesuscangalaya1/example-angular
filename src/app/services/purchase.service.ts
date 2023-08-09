import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {PurchaseRequest} from "../models/purchase-request";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  url = environment.URL;

  //local = "http://localhost:8080/api/";
  local = "https://api-2-e35q.onrender.com/api/";
  constructor(private http: HttpClient,
              private tokenService: TokenService) {}


  exportInvoice(id: number): Observable<any> {
    const url = `${this.local}purchases/exportInvoice/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }


  deletePurchase(id: number): Observable<any> {
    const url = `${this.url}purchases/${id}`;
    return this.http.delete(url);
  }



  public listCustomerPurchases(): Observable<any> {
    const token = this.tokenService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };

    return this.http.get<any>(this.url + 'purchases', httpOptions);
  }


  // Realizar una compra de un vuelo
  public purchaseFlight(purchaseRequest: PurchaseRequest, token: { headers: HttpHeaders }): Observable<any> {
    const token2 = this.tokenService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token2}`
      })
    };

    return this.http.post<any>(this.url + 'purchases', purchaseRequest, httpOptions);
  }

}
