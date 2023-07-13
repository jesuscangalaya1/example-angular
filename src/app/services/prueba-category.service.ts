import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CategoryDTO} from "../models/category-dto";
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PruebaCategoryService {

  url :string = environment.URL
  constructor(private http:HttpClient) { }


  onCreate(category: CategoryDTO): Observable<any>{
    return this.http.post<any>(this.url + 'categories', category);
  }

  listCategory(): Observable<any> {
    return this.http.get<any>(this.url + 'categories');
  }


  getCategoryById(id: number): Observable<CategoryDTO> {
    return this.http.get<CategoryDTO>(this.url + 'categories/' + id);
  }


  updateCategory(id: number, category: CategoryDTO): Observable<any> {
    return this.http.put<any>(this.url + 'categories/'+ id, category);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<any>(this.url + 'categories/'+ id);
  }


}
