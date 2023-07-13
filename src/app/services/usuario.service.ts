import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../models/usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.URL;

  constructor(private http: HttpClient) {}


  public obtenerUsuarios(pageNo: number, pageSize: number): Observable<any> {
    const endpoint = `${this.url}users/pageable-users`;

    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(endpoint, { params });
  }


  public deleteUser(id: number): Observable<any> {
    return this.http.delete<string>(`${this.url}users/${id}`);
  }


}
