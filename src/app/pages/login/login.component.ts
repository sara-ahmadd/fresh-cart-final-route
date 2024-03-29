import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showPassword: boolean = false;
  isLoading: boolean = false;
  loginError: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,8}$/),
    ]),
  });

  constructor(private _authService: AuthService, private _router: Router) {}

  displayEyeIcon(val: string) {
    this.showPassword = !this.showPassword;
  }
  allControlsTouched(form: FormGroup) {
    form.markAllAsTouched();
  }

  login(form: FormGroup) {
    this.allControlsTouched(form);
    if (form.valid) {
      this.isLoading = true;
      this.loginError = '';

      this._authService.signIn(form.value).subscribe({
        next: (data) => {
          this.isLoading = false;
          if (data.message == 'success') {
            localStorage.setItem('userToken', data.token);
            this._authService.setUserToken();
            this._authService.saveUserData();
            this._router.navigate(['/home']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.loginError = error.error.message;
          console.log(error);
        },
      });
    }
  }
}
