import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { authGuard } from 'src/auth.guard';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { DetailsComponent } from './pages/details/details.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { WishListComponent } from './pages/wish-list/wish-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
    title: 'home',
  },
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
  {
    path: 'products',
    canActivate: [authGuard],
    component: ProductsPageComponent,
    title: 'products',
  },
  {
    path: 'productDetails/:id',
    component: DetailsComponent,
    title: 'ProductDetails',
  },
  { path: 'register', component: RegisterComponent, title: 'register' },
  {
    path: 'wishList',
    canActivate: [authGuard],
    component: WishListComponent,
    title: 'wishList',
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    component: CartComponent,
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
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
