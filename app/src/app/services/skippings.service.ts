import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ISkipping} from '../models/skipping';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkippingsService {

  private url = environment.apiUrl + 'skippings';

  constructor(
    private http: HttpClient
  ) { }

  create(skipping: ISkipping) {
    return this.http.post(this.url, skipping);
  }

  getByScheduleId(scheduleId: string): Observable<ISkipping> {
    return this.http.get(this.url + '/by-schedule-id/' + scheduleId) as Observable<ISkipping>;
  }

  verification(scheduleId: string) {
    return this.http.get(this.url + '/verification/' + scheduleId);
  }
}
