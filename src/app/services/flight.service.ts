import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {FlightDto} from "../models/flight-dto";
import {Observable, of} from "rxjs";
import {PageableDto} from "../models/pageable-dto";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  url = environment.URL;
  constructor(private httpClient: HttpClient) { }




  createFlight(payload: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.url}flights/create-image`, payload);
  }

  updateFlight(id: number, payload: FormData): Observable<any> {
    return this.httpClient.put<any>(`${this.url}flights/${id}`, payload);
  }

  getAllFlights(pageNo?: number, pageSize?: number, priceMin?: number, priceMax?: number, departureTime?: string): Observable<any> {
    let params = new HttpParams();
    if (pageNo) params = params.set('pageNo', pageNo.toString());
    if (pageSize) params = params.set('pageSize', pageSize.toString());
    if (priceMin) params = params.set('precioMinimo', priceMin.toString());
    if (priceMax) params = params.set('precioMaximo', priceMax.toString());
    if (departureTime) params = params.set('fechaSalida', departureTime);

    return this.httpClient.get<any>(`${this.url}flights/list`, { params });
  }

  exportFlights(pageNo?: number, pageSize?: number, priceMin?: number, priceMax?: number, format: string='excel'): Observable<any> {
    let params = new HttpParams();
    if (pageNo !== undefined) params = params.set('pageNo', pageNo.toString());
    if (pageSize !== undefined) params = params.set('pageSize', pageSize.toString());
    if (priceMin !== undefined) params = params.set('precioMinimo', priceMin.toString());
    if (priceMax !== undefined) params = params.set('precioMaximo', priceMax.toString());
    params = params.set('format', format.toUpperCase()); // Convertir a mayúsculas

    return this.httpClient.get<any>(`${this.url}flights/export-data`, { params, responseType: 'blob' as 'json' });
  }


  getFlightImage(id: number): Observable<string> {
    return this.httpClient.get(`${this.url}flights/image/${id}`, { responseType: 'blob' })
      .pipe(
        switchMap((imageData: Blob) => {
          const imageURL = URL.createObjectURL(imageData);
          return of(imageURL);
        })
      );
  }


  getFlightById(id: number): Observable<any> {
    return this.httpClient.get<FlightDto>(`${this.url}flights/${id}`);
  }

  deleteFlight(id: number): Observable<any> {
    return this.httpClient.delete<string>(`${this.url}flights/${id}`);
  }




}
