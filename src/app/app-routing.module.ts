import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { LoginComponent } from './content/login/login.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './content/home/home.component';
import { AboutUsComponent } from './content/about-us/about-us.component';
import { ProfileComponent } from './content/profile/profile.component';
import { OrderpgComponent } from './content/orderpg/orderpg.component';
import { ProductpgComponent } from './content/productpg/productpg.component';






const routes: Routes = [
  { path: '', component: MainComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'order', component: OrderpgComponent },
      { path: 'productd', component: ProductpgComponent },




    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
