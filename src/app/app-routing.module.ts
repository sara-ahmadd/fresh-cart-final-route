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
