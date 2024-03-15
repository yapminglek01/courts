import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

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
import { AboutUsComponent } from './content/about-us/about-us.component';
import { ProfileComponent } from './content/profile/profile.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { OrderComponent } from './component/order/order.component';
import { OrderpgComponent } from './content/orderpg/orderpg.component';
import { ProductInfoComponent } from './component/product-info/product-info.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { ProductpgComponent } from './content/productpg/productpg.component';
import { HomeComponent } from './content/home/home.component'; // Import ReactiveFormsModule if using reactive forms
import { SalesRatioComponent } from './content/admin/dashboard/sales/sales-ratio.component';
import { DashboardComponent } from './content/admin/dashboard.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { adminProduct } from './content/admin/product/admin-product.component';
import { addProduct } from './content/admin/product/addProduct/add-product.component';
import { nonUserProduct } from './content/NonUser/nonUser-product.component';
import { customerProduct } from './content/customer/customer-product.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UpdatePassComponent } from './component/update-pass/update-pass.component';
import { UpdateProfileComponent } from './component/update-profile/update-profile.component';


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
    AboutUsComponent,
    ProfileComponent,
    UserProfileComponent,
    OrderComponent,
    OrderpgComponent,
    ProductInfoComponent,
    ProductDetailsComponent,
    ProductpgComponent,
    SalesRatioComponent,
    DashboardComponent,
    adminProduct,
    addProduct,
    nonUserProduct,
    customerProduct,
    UpdatePassComponent,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    DataViewModule,
    RatingModule,
    TagModule,
    NgApexchartsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
