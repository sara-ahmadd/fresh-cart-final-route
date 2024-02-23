import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { CheckOutService } from 'src/app/services/check-out.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  paymentError: string = '';
  cartId: string = '';

  checkOutForm: FormGroup = new FormGroup({
    details: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[1250][0-9]{8}$/),
    ]),
    city: new FormControl(null, [Validators.required, Validators.minLength(3)]),
  });
  constructor(
    private _checkOutService: CheckOutService,
    private _cart: CartService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }
  getCart() {
    this._cart.getLoggedUserCart().subscribe({
      next: (data) => {
        if (data.status === 'success') {
          this.cartId = data.data._id;
          localStorage.setItem('userId', data.data.cartOwner);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  paymentFunction(form: FormGroup) {
    if (form.valid) {
      this._checkOutService.checkOutSession(this.cartId, form.value).subscribe({
        next: (data) => {
          if (data.status === 'success') {
            window.location = data.session.url;
          }
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  get paymentErrors() {
    return this.checkOutForm?.errors;
  }
  get detailsControl() {
    return this.checkOutForm.get('details');
  }
  get phoneControl() {
    return this.checkOutForm.get('phone');
  }
  get cityControl() {
    return this.checkOutForm.get('city');
  }
}
