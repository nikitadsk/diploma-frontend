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

  public getAll(): Observable<IDiscipline[]> {
    return this.http.get(this.url) as Observable<IDiscipline[]>;
  }

  public getByIds(ids: string[]): Observable<IDiscipline[]> {
    return this.http.post(this.url + '/by-array-ids', { disciplineIds: ids }) as Observable<IDiscipline[]>;
  }

  public create(discipline: IDiscipline) {
    return this.http.post(this.url, { disciplineName: discipline.disciplineName});
  }

  public delete(disciplineId: string) {
    return this.http.delete(this.url + `/${disciplineId}`);
  }
}
