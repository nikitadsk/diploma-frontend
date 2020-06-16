import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of, Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.apiUrl + 'login';

  userAuth$: Subject<string | undefined> = new Subject<string|undefined>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getUserName(): string {
    let result;
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      result = `${parsedUser.firstName} ${parsedUser.lastName}`;
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
    this.router.navigateByUrl('/home');
    this.userAuth$.next(undefined);
  }

  public checkToken(): Observable<boolean> {
    const token = this.getToken();
    return this.http.post(environment.apiUrl + 'check-token', { token }).pipe(
      map(({ user }: any) => {
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }),
      catchError(() => {
        this.logout();
        return of(false);
      }),
    );
  }

  public isDepartmentHead() {
    return !!JSON.parse(localStorage.getItem('user')).isDepartmentHead;
  }

  public isCurator() {
    return !!JSON.parse(localStorage.getItem('user')).isCurator;
  }

  public isDispatcher() {
    return !!JSON.parse(localStorage.getItem('user')).isDispatcher;
  }

  public isHeadman() {
    return !!JSON.parse(localStorage.getItem('user')).isHeadman;
  }

  public isAdmin() {
    return !!JSON.parse(localStorage.getItem('user')).isAdmin;
  }

  public getEditedSpecialty() {
    return JSON.parse(localStorage.getItem('user')).editedSpecialty;
  }

  public getEditedGroup() {
    return JSON.parse(localStorage.getItem('user')).editedGroup;
  }

}
