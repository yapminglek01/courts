import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { LoginComponent } from './content/login/login.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './content/home/home.component';




const routes: Routes = [
  { path: '', component: MainComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductComponent },
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
