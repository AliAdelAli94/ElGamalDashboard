import { Component, OnInit } from '@angular/core';
import { LoginDTO } from '../models/LoginDTO.model';
import { Router } from '@angular/router';
import { DatabaseManipulationService } from '../services/database-manipulation.service';
import { CookieService } from 'ngx-cookie';
import { DynamicScriptLoaderService } from '../services/dynamic-script-loader-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentLogin: LoginDTO = new LoginDTO();
  loginSaveForm: boolean = false;
  inCorrectData: boolean = false;

  constructor(private router: Router,
    private databaseManipulationService: DatabaseManipulationService,private cookieService:CookieService,
    private dynamicScriptLoaderService : DynamicScriptLoaderService) { }

  ngOnInit() {
  }

  login() {
    this.dynamicScriptLoaderService.showSpinner();
    this.databaseManipulationService.login(this.currentLogin).subscribe(response => {

      if(response == null)
      {
        this.inCorrectData = true;
      }
      else
      {
        this.cookieService.put("userData",JSON.stringify(response));
        this.router.navigateByUrl('/home/start-page');
      }
    },()=>{},()=>{
      this.dynamicScriptLoaderService.hideSpinner();
    });
  }

}
