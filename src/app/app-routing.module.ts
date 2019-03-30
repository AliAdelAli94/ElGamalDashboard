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


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, children: [

      { path: '', redirectTo: 'start-page', pathMatch: 'full' },

      { path: 'start-page', component: StartPageComponent },

      { path: 'add-category', component: AddCategoryComponent },

      { path: 'add-product', component: AddProductComponent },

      { path: 'edit-product', component: AddProductComponent },

      { path: 'view-products', component: ViewProductsComponent },

      { path: 'view-users', component: ViewUsersComponent },

      { path: 'add-user', component: AddUserComponent }





    ]
  },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
