import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class PruebaProductService {
  url :string = environment.URL

  constructor(private httpClient: HttpClient) { }


  getProductById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.url + 'products/' + id);
  }

  createProduct(product :any): Observable<any>{
    return this.httpClient.post<any>(this.url + 'products/', product);
  }

  listProducts(): Observable<any>{
    return this.httpClient.get<any>(this.url + 'products/');
  }

  updatedProduct(id: number, product :Product): Observable<any>{
    return this.httpClient.put<any>(this.url + 'products/' + id , product);
  }

  deletedProduct(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + 'products/'+ id);
  }

}
