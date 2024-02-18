import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { LoginComponent } from './content/login/login.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './content/home/home.component';
import { DashboardComponent } from './content/admin/dashboard.component';
import { adminProduct } from './content/admin/product/admin-product.component';
import { addProduct } from './content/admin/product/addProduct/add-product.component';




const routes: Routes = [
  { path: '', component: MainComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'adminProduct', component: adminProduct },
      { path: 'addProduct', component: addProduct},
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
