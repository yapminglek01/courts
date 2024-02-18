import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './include/header/header.component';
import { FooterComponent } from './include/footer/footer.component';
import { ProductTilesComponent } from './component/product/product-tiles/product-tiles.component';
import { ProductComponent } from './component/product/product.component';
import { MainComponent } from './main/main.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { ProductCategoryComponent } from './component/product/product-category/product-category.component';
import { AboutComponent } from './component/about/about.component';
import { FaqComponent } from './component/faq/faq.component';
import { LoginComponent } from './content/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './content/register/register.component';
import { MaterialModule } from './modules/material.module';
import { HomeComponent } from './content/home/home.component'; // Import ReactiveFormsModule if using reactive forms

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductTilesComponent,
    ProductComponent,
    MainComponent,
    CarouselComponent,
    ProductCategoryComponent,
    AboutComponent,
    FaqComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
