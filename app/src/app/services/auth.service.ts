import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.apiUrl + 'login';

  userAuth$: Subject<string | undefined> = new Subject<string|undefined>();

  constructor(
    private http: HttpClient
  ) {
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getUserName(): string | undefined {
    let result;
    const user = localStorage.getItem('user');
    if (user) {
      const { firstName, lastName } = JSON.parse(user);
      result = `${firstName} ${lastName}`;
    }

    return result;
  }

  public login(login: string, password: string) {
    return this.http.post<any>(this.url, {
      login,
      password
    });
  }

  public logout() {
    localStorage.clear();
    this.userAuth$.next(undefined);
  }

}
