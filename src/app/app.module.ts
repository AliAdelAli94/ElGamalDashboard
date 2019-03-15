import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {DynamicScriptLoaderService} from './services/dynamic-script-loader-service.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { StartPageComponent } from './home/start-page/start-page.component';
import { FooterComponent } from './home/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AddCategoryComponent } from './home/add-category/add-category.component';
import { DatabaseManipulationService } from './services/database-manipulation.service';
import { HttpClientModule } from '@angular/common/http' ;
import { FormsModule} from '@angular/forms';
import { AddProductComponent } from './home/add-product/add-product.component';

 
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
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule
  ],
  providers: [DynamicScriptLoaderService,DatabaseManipulationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
