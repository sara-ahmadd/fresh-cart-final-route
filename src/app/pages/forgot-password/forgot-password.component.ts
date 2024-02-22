import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  errorMsg!: string;
  loader: boolean = false;

  forgotPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  constructor(private _authService: AuthService, private _router: Router) {}
  sendEmailToGetCode(form: FormGroup) {
    this.errorMsg = '';
    if (this.forgotPassword.valid) {
      this.loader = true;
      this._authService.forgotPassword(form.value).subscribe({
        next: (data: any) => {
          this.loader = false;
          if (data.statusMsg == 'success') {
            this._router.navigate(['/verifyCode']);
          }
        },
        error: (err) => {
          this.loader = false;
          this.errorMsg = err.error.message;
          console.log(err);
        },
      });
    }
  }
}
