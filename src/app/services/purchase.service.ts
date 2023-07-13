import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PurchaseResponse} from "../models/purchase-response";
import {Observable} from "rxjs";
import {PurchaseRequest} from "../models/purchase-request";
import {Mensaje} from "../models/mensaje";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  url = environment.URL;

  constructor(private http: HttpClient,
              private tokenService: TokenService) {}

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
