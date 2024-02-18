import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css'],
})
export class VerifyCodeComponent {
  loader: boolean = false;
  errorMsg!: string;
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });
  constructor(private _authService: AuthService, private _router: Router) {}
  verifyCodeOnSubmit(form: FormGroup) {
    if (this.verifyCode.valid) {
      this.loader = true;
      this.errorMsg = '';
      this._authService.verifyResetCode(form.value).subscribe({
        next: (data: any) => {
          this.loader = false;
          console.log(data);
          if (data.status == 'Success') {
            this._router.navigate(['/resetPassword']);
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
