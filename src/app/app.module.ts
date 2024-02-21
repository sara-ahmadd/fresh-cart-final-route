import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { ProductsComponent } from './pages/home/components/products/products.component';
import { MainSliderComponent } from './pages/home/components/main-slider/main-slider.component';
import { CategorySliderComponent } from './pages/home/components/category-slider/category-slider.component';
import { DetailsComponent } from './pages/details/details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { AddToCartBtnComponent } from './Shared/add-to-cart-btn/add-to-cart-btn.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { WishListComponent } from './pages/wish-list/wish-list.component';
import { HeartIconComponent } from './Shared/heart-icon/heart-icon.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { LoaderComponent } from './pages/loader/loader.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { SearchPipe } from './pipes/search.pipe';
import { DatePipe } from './pipes/date.pipe';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    ProductsComponent,
    MainSliderComponent,
    CategorySliderComponent,
    DetailsComponent,
    NotFoundComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    BrandsComponent,
    CategoriesComponent,
    ProductsPageComponent,
    AddToCartBtnComponent,
    ForgotPasswordComponent,
    VerifyCodeComponent,
    ResetPasswordComponent,
    WishListComponent,
    HeartIconComponent,
    CheckOutComponent,
    LoaderComponent,
    OrdersComponent,
    SearchPipe,
    DatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
