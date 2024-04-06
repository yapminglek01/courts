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

import { DashboardComponent } from './content/admin/dashboard.component';
import { adminProduct } from './content/admin/product/admin-product.component';
import { addProduct } from './content/admin/product/addProduct/add-product.component';
import { nonUserProduct } from './content/NonUser/nonUser-product.component';
import { customerProduct } from './content/customer/customer-product.component';
import { storesMapNonUser } from './content/maps-nonUser/stores-map.component';
import { storesMapUser } from './content/maps-User/stores-map.component';
import { PaymentComponent } from './component/payment/payment.component';

const routes: Routes = [
  { path: '', component: MainComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'order', component: OrderpgComponent },
      { path: 'product/:id', component: ProductpgComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'adminProduct', component: adminProduct },
      { path: 'addProduct', component: addProduct},
      { path: 'nonUserProduct', component: nonUserProduct},
      { path: 'customerProduct', component: customerProduct},
      { path: 'stores-map-nonUser', component: storesMapNonUser},
      { path: 'stores-map-User', component: storesMapUser},
      { path: 'payment', component: PaymentComponent}

    ]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
