import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IGroup} from '../models/group';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private url = environment.apiUrl + 'groups';

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<IGroup[]> {
    return this.http.get(this.url) as Observable<IGroup[]>;
  }
}
