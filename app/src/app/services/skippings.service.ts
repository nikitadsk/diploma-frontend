import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ISkipping} from '../models/skipping';

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
}
