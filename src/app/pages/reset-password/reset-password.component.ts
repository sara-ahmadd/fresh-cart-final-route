import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  showPassword: boolean = false;
  isLoading: boolean = false;
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-z][0-9a-z]{6,8}$/),
    ]),
  });
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _loader: LoaderService
  ) {}

  resetPasswordOnSubmit(form: FormGroup) {
    if (form.valid) {
      this.isLoading = true;
      this._loader.show();
      this._authService.resetPassword(form.value).subscribe({
        next: (data: any) => {
          this._loader.hide();
          if (data.token) {
            this.isLoading = false;
            this._router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  displayEyeIcon() {
    this.showPassword = !this.showPassword;
  }
}
