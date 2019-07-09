import { Component, OnInit } from '@angular/core';
import { OrderDetailsDTO } from 'src/app/models/OrderDetailsDTO.model';
import { DatabaseManipulationService } from 'src/app/services/database-manipulation.service';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';
import { stringify } from '@angular/core/src/util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.css']
})
export class ViewOrderDetailsComponent implements OnInit {

  constructor(private databaseManipulationService: DatabaseManipulationService,
    private dynamicScriptLoader : DynamicScriptLoaderService,private router : ActivatedRoute) { }
  public item : OrderDetailsDTO = new OrderDetailsDTO(); 

  ngOnInit() {
    let id = this.router.snapshot.params.id;
    debugger;
    this.getOrderDetails(id);
  }

  getOrderDetails(id : string){

    this.dynamicScriptLoader.showSpinner();
          this.databaseManipulationService.GetOrderDetailsByID(id).subscribe(response => {
            if(response){
              this.item = response;
            }       
          },()=>{},()=>{
            this.dynamicScriptLoader.hideSpinner();
          });

  }

}
