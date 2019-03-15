import { Component, AfterViewInit } from '@angular/core';
import { DynamicScriptLoaderService} from 'src/app/services/dynamic-script-loader-service.service';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements AfterViewInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngAfterViewInit() { 

    this.dynamicScriptLoader.intializeJqueryCore();
    this.dynamicScriptLoader.intializeJqueryApp();
    
  }

}
