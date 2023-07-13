import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BraintreeDto} from "../models/braintree-dto";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url = environment.URL;

  constructor(private httpClient: HttpClient) { }

  public getToken(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'braintree/token');
  }

  public checkout(dto: BraintreeDto): Observable<any> {
    return this.httpClient.post<any>(this.url + 'braintree/checkout', dto);
  }

}
