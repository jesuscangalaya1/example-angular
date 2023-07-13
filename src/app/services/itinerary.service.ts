import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  url = environment.URL;

  constructor(private httpClient: HttpClient) { }

  public importExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.httpClient.post(`${this.url}itineraries/import-excel`, formData, { headers });
  }

  listItineraries(pageNo: number, pageSize: number): Observable<any> {
    const endpoint = `${this.url}itineraries/pageable`;

    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());

    return this.httpClient.get<any>(endpoint, { params });
  }



}
