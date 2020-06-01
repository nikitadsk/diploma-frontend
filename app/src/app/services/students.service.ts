import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IStudent} from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private url = environment.apiUrl + 'students';

  constructor(
    private http: HttpClient
  ) { }

  public getByGroupId(groupId: string): Observable<IStudent[]> {
    return this.http.get(this.url + '/by-group-id/' + groupId) as Observable<IStudent[]>;
  }

  public create(student: IStudent) {
    return this.http.post(this.url, student);
  }
}
