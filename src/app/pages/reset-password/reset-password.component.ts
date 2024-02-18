import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  showPassword: boolean = false;
  isLoading: boolean = false;
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(),
    newPassword: new FormControl(),
  });
  constructor(private _authService: AuthService, private _router: Router) {}

  resetPasswordOnSubmit(form: FormGroup) {
    if (form.valid) {
      this.isLoading = true;
      this._authService.resetPassword(form.value).subscribe({
        next: (data: any) => {
          if (data.token) {
            this._router.navigate(['/login']);
          }
          console.log(data);
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
