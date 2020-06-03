import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ISchedule} from '../models/schedule';
import {HttpClient} from '@angular/common/http';
import {flatMap, map, toArray} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  private url = environment.apiUrl + 'schedules';

  constructor(
    private http: HttpClient
  ) { }

  public getByGroupId(groupId: string): Observable<ISchedule[]> {
    return this.http.get(this.url + '/by-group-id/' + groupId).pipe(
      flatMap((schedules: ISchedule[]) => schedules),
      map(schedule => {
        schedule.regionalDate = moment(schedule.date).format('DD MM YYYY');
        return schedule;
      }),
      toArray()
    ) as Observable<ISchedule[]>;
  }

  public getByTeacherId(teacherId: string): Observable<ISchedule[]> {
    return this.http.get(this.url + '/by-teacher-id/' + teacherId).pipe(
      flatMap((schedules: ISchedule[]) => schedules),
      map(schedule => {
        schedule.lessons = schedule.lessons.filter(lesson => lesson.teacherId === teacherId);
        return schedule;
      }),
      toArray()
    ) as Observable<ISchedule[]>;
  }

  public create(schedule: ISchedule) {
    return this.http.post(this.url, schedule);
  }
}
