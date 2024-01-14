import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IRegister } from 'src/app/interfaces/register';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  formData: IRegister = {
    username: '',
    email: '',
    password: 'password',
  };

  repeatPassword: string = '';

  constructor(private authSvc: AuthService, private router: Router) {}

  register() {
    if (this.formData.password === this.repeatPassword) {
      this.authSvc.signUp(this.formData).subscribe((res) => {
        console.log(res);
        this.router.navigate(['']);
      });
    } else alert("Passwords don't match");
  }
}
