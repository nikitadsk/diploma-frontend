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

  public getById(id): Observable<IGroup> {
    return this.http.get(this.url + '/' + id) as Observable<IGroup>;
  }

  public getByCuratorId(curatorId: string): Observable<IGroup> {
    return this.http.get(this.url + '/by-curator-id/' + curatorId) as Observable<IGroup>;
  }

  public create(group: IGroup) {
    return this.http.post(this.url, group);
  }

  public update(group: IGroup) {
    console.log(group._id);
    return this.http.put(this.url + '/' + group._id, group);
  }
}
