import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {IDiscipline} from "../models/discipline";

@Injectable({
  providedIn: 'root'
})
export class DisciplinesService {

  private url = environment.apiUrl + 'disciplines';

  constructor(private http: HttpClient) { }

  public get(): Observable<IDiscipline[]> {
    return this.http.get(this.url) as Observable<IDiscipline[]>;
  }
}
