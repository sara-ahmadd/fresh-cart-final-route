import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { authGuard } from 'src/app/guards/auth.guard';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { DetailsComponent } from './pages/details/details.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { WishListComponent } from './pages/wish-list/wish-list.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'login' },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    title: 'Reset Password',
  },
  {
    path: 'verifyCode',
    component: VerifyCodeComponent,
    title: 'Code Verification',
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    title: 'Reset Password',
  },
  { path: 'register', component: RegisterComponent, title: 'register' },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
    title: 'home',
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    title: 'home',
  },
  {
    path: 'products',
    canActivate: [authGuard],
    component: ProductsPageComponent,
    title: 'products',
  },
  {
    path: 'productDetails/:id',
    canActivate: [authGuard],
    component: DetailsComponent,
    title: 'ProductDetails',
  },
  {
    path: 'wishList',
    canActivate: [authGuard],
    component: WishListComponent,
    title: 'wishList',
  },
  {
    path: 'checkOut',
    canActivate: [authGuard],
    component: CheckOutComponent,
    title: 'CheckOut',
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    component: CartComponent,
    title: 'cart',
  },
  {
    path: 'allorders',
    canActivate: [authGuard],
    component: OrdersComponent,
    title: 'cart',
  },
  {
    path: 'brands',
    canActivate: [authGuard],
    component: BrandsComponent,
    title: 'brands',
  },
  {
    path: 'categories',
    canActivate: [authGuard],
    component: CategoriesComponent,
    title: 'categories',
  },

  { path: '**', component: NotFoundComponent, title: 'notFound' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
