import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITeacher} from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private url = environment.apiUrl + 'teachers';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<ITeacher[]> {
    return this.http.get(this.url) as Observable<ITeacher[]>;
  }

  public getAvailableAsNewCurator(): Observable<ITeacher[]> {
    return this.http.get(this.url + '/available/as-new-curator') as Observable<ITeacher[]>;
  }

  public create(teacher: ITeacher) {
    return this.http.post(this.url, teacher);
  }
}
