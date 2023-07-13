import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocationsDto} from "../models/locations-dto";
import {Origins} from "../models/origins";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  url = environment.URL;

  constructor(private httpClient: HttpClient) {
  }

  public listLocations(): Observable<{ data: LocationsDto[] }> {
    return this.httpClient.get<{ data: LocationsDto[] }>(this.url + 'countrys/locations');
  }

  public listOrigins(): Observable<{ data: Origins[] }> {
    return this.httpClient.get<{ data: Origins[] }>(this.url + 'countrys/origins');
  }

  public searchOriginsAndDestinations(searchTerm: string): Observable<Location[]> {
    const params = {term: searchTerm};
    return this.httpClient.get<Location[]>(`${this.url}/search`, {params});
  }


}
