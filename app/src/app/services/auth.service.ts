import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.apiUrl + 'login';

  constructor(
    private http: HttpClient
  ) { }

  public getToken() {
    return localStorage.getItem('token');
  }

  public login(login: string, password: string) {
    return this.http.post<any>(this.url, {
      login,
      password
    });
  }

}
