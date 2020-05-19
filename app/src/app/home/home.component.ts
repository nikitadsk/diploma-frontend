import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAuthorized: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.userAuth$.subscribe(userName => {
      this.isAuthorized = !!userName;
    })

    this.authService.userAuth$.next(this.authService.getUserName());
  }

}
