import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  userName: string;

  constructor(
    private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.userAuth$.subscribe(userName => {
      this.userName = userName;
    });

    this.authService.userAuth$.next(this.authService.getUserName());
  }

  logout() {
    this.authService.logout();
  }
}
