import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ISpecialty} from '../models/specialty';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  private url = environment.apiUrl + 'specialty';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<ISpecialty[]> {
    return this.http.get(this.url) as Observable<ISpecialty[]>;
  }

  public create(specialty: ISpecialty) {
    return this.http.post(this.url, specialty);
  }
}
