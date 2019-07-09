import { Component, OnInit } from '@angular/core';
import { OrderDetailsDTO } from 'src/app/models/OrderDetailsDTO.model';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseManipulationService } from 'src/app/services/database-manipulation.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  constructor(private databaseManipulationService: DatabaseManipulationService,
    private dynamicScriptLoader: DynamicScriptLoaderService, private router: ActivatedRoute,private routerr: Router) { }
  public item: OrderDetailsDTO = new OrderDetailsDTO();
  public id : string;
  ngOnInit() {
    this.id = this.router.snapshot.params.id;
    debugger;
    this.getOrderDetails(this.id);
  }

  getOrderDetails(id: string) {

    this.dynamicScriptLoader.showSpinner();
    this.databaseManipulationService.GetOrderDetailsByID(id).subscribe(response => {
      if (response) {
        this.item = response;
      }
    }, () => { }, () => {
      this.dynamicScriptLoader.hideSpinner();
    });

  }

  confirmOrder(){

    this.dynamicScriptLoader.showSpinner();
    this.databaseManipulationService.ConfirmOrder(this.id).subscribe(response => {
      if (response == 0) {
        this.routerr.navigate(['/home/view-orders']);        
      }
    }, () => { }, () => {
      this.dynamicScriptLoader.hideSpinner();
    });
  }


}
