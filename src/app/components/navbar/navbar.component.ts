import { Component } from '@angular/core';
import { IAccessData } from 'src/app/interfaces/accessdata';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  logged!: boolean;
  user!: IAccessData;

  constructor(private authSvc: AuthService) {
    this.authSvc.isLoggedIn$.subscribe((log) => (this.logged = log));
    this.authSvc.user$.subscribe((user) => (this.user = user as IAccessData));
  }

  logout() {
    this.authSvc.logout();
  }
}
