import { Component, AfterViewInit } from '@angular/core';
import { DynamicScriptLoaderService} from 'src/app/services/dynamic-script-loader-service.service';
import { CookieService } from 'ngx-cookie';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements AfterViewInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService,private cookieService:CookieService) { }

  ngAfterViewInit() { 

    this.dynamicScriptLoader.intializeJqueryCore();
    this.dynamicScriptLoader.intializeJqueryApp();
    console.log(this.cookieService.get("userData"));
  }

}
