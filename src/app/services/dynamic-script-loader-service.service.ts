import { Injectable } from '@angular/core';
import { declaredViewContainer } from '@angular/core/src/view/util';

declare function intializeJqueryCoreFunc(): void;
declare function intializeJqueryAppFunc(): void;
declare function intializeFirstTimeOnlyHomeFunc(): void;

@Injectable()

export class DynamicScriptLoaderService {


  constructor() { }


  intializeJqueryCore() {

    intializeJqueryCoreFunc();
  }


  intializeJqueryApp() {

    intializeJqueryAppFunc();
  }


  intializeFirstTimeOnlyHome() {
    intializeFirstTimeOnlyHomeFunc();
  }

 
}
