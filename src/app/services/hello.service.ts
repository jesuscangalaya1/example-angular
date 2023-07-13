import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MessageDto} from "../models/message-dto";

@Injectable({
  providedIn: 'root'
})
export class HelloService {

  backendURL = environment.URL;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getHello(): Observable<MessageDto> {
    return this.httpClient.get<MessageDto>(this.backendURL + 'hello');
  }

}
