import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';






import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductTilesComponent } from './component/product-tiles/product-tiles.component';
import { ProductComponent } from './product/product.component';
import { MainComponent } from './main/main.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductCategoryComponent } from './component/product-category/product-category.component';
import { MatCardModule } from '@angular/material/card';
import { AboutComponent } from './about/about.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { FaqComponent } from './about/faq/faq.component';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component'; // Import ReactiveFormsModule if using reactive forms








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
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
   
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
