import { Component, AfterViewInit } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngAfterViewInit() {
    this.dynamicScriptLoader.intializeFirstTimeOnlyHome();
  }

}
