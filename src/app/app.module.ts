import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DynamicScriptLoaderService } from './services/dynamic-script-loader-service.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { StartPageComponent } from './home/start-page/start-page.component';
import { FooterComponent } from './home/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AddCategoryComponent } from './home/add-category/add-category.component';
import { DatabaseManipulationService } from './services/database-manipulation.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddProductComponent } from './home/add-product/add-product.component';
import { ViewProductsComponent } from './home/view-products/view-products.component';
import { ViewCategoriesComponent } from './home/view-categories/view-categories.component';
import { EditViewProductService } from './services/edit-view-product.service';
import { ViewUsersComponent } from './home/view-users/view-users.component';
import { CookieModule } from 'ngx-cookie';
import { AddUserComponent } from './home/add-user/add-user.component';
import { AuthGuard } from './auth.guard';
import { ViewOrdersComponent } from './home/view-orders/view-orders.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    StartPageComponent,
    FooterComponent,
    LoginComponent,
    AddCategoryComponent,
    AddProductComponent,
    ViewProductsComponent,
    ViewCategoriesComponent,
    ViewUsersComponent,
    AddUserComponent,
    ViewOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CookieModule.forRoot()
  ],
  providers: [DynamicScriptLoaderService, DatabaseManipulationService,EditViewProductService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
