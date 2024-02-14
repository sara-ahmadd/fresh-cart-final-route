import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // properties
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,8}$/),
    ]),
    rePassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,8}$/),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[1250][0-9]{8}$/),
    ]),
  });
  showPassword: boolean = false;
  showRePassword: boolean = false;
  isLoading: boolean = false;
  registerError: string = '';
  registerSuccess: string = '';

  // methods
  constructor(private _authService: AuthService) {}
  displayEyeIcon(val: string) {
    if (val === 'password') {
      this.showPassword = !this.showPassword;
    }
    if (val === 'rePassword') {
      this.showRePassword = !this.showRePassword;
    }
  }
  allControlTouched() {
    this.registerForm.markAllAsTouched();
  }

  register(form: FormGroup) {
    this.allControlTouched();
    this.isLoading = true;
    if (form.valid) {
      this._authService.signUp(form.value).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.registerSuccess = data.message;
          console.log(data);
        },
        error: (error) => {
          this.isLoading = false;
          this.registerError = error.error.message;
          console.log(error);
        },
      });
    }
  }
}
