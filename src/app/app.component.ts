import {Component} from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userAuthorized: boolean;

  constructor(private authService: AuthService) {}

  userAuthentification() {
    const userStatus = this.authService.loggedIn;
    if (!userStatus) {
      this.authService.onLogin();
      this.userAuthorized = true;
    } else {
      this.authService.onLogout();
      this.userAuthorized = false;
    }
  }
}
