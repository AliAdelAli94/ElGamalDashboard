import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StartPageComponent } from './home/start-page/start-page.component';
import { AddCategoryComponent } from './home/add-category/add-category.component';
import { AddProductComponent } from './home/add-product/add-product.component';
import { ViewProductsComponent } from './home/view-products/view-products.component';
import { ViewUsersComponent } from './home/view-users/view-users.component';
import { AddUserComponent } from './home/add-user/add-user.component';
import { ViewCategoriesComponent } from './home/view-categories/view-categories.component';
import { AuthGuard } from './auth.guard';
import { ViewOrdersComponent } from './home/view-orders/view-orders.component';
import { ViewOrderDetailsComponent } from './home/view-order-details/view-order-details.component';
import { ConfirmOrderComponent } from './home/confirm-order/confirm-order.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, children: [

      { path: '', redirectTo: 'start-page', pathMatch: 'full',canActivate: [AuthGuard] },

      { path: 'start-page', component: StartPageComponent,canActivate: [AuthGuard] },

      { path: 'add-category', component: AddCategoryComponent,canActivate: [AuthGuard] },

      { path: 'add-product', component: AddProductComponent,canActivate: [AuthGuard] },

      { path: 'edit-product', component: AddProductComponent,canActivate: [AuthGuard] },

      { path: 'edit-category', component: AddCategoryComponent,canActivate: [AuthGuard] },

      { path: 'view-products', component: ViewProductsComponent,canActivate: [AuthGuard] },

      { path: 'view-users', component: ViewUsersComponent,canActivate: [AuthGuard] },

      { path: 'add-user', component: AddUserComponent,canActivate: [AuthGuard] },

      { path: 'view-categories', component:ViewCategoriesComponent,canActivate: [AuthGuard]},

      { path: 'view-orders', component:ViewOrdersComponent,canActivate: [AuthGuard]},

      { path: 'view-order-details', component:ViewOrderDetailsComponent,canActivate: [AuthGuard]},

      { path: 'confirm-order', component:ConfirmOrderComponent,canActivate: [AuthGuard]}



      

    ]
  },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
