import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  showPassword: boolean = false;
  showRePassword: boolean = false;
  isLoading: boolean = false;
  registerError: string = '';
  registerForm: FormGroup = new FormGroup(
    {
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
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[1250][0-9]{8}$/),
      ]),
    },
    {
      validators: this.passwordValidator,
    }
  );

  constructor(private _authService: AuthService, private _router: Router) {}
  passwordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const rePassword = control.get('rePassword');

    if (password && rePassword && password.value !== rePassword.value) {
      control.setErrors({ 'Passwords mismatch': true });
      return { 'Passwords mismatch': true };
    }
    return null;
  }
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
    if (form.valid) {
      this.isLoading = true;
      this.registerError = '';

      this._authService.signUp(form.value).subscribe({
        next: (data) => {
          this.isLoading = false;
          this._router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.registerError = error.error.message;
        },
      });
    }
  }
}
