import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseManipulationService } from 'src/app/services/database-manipulation.service';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';
import { GetOrderDTO } from 'src/app/models/GetOrderDTO.model';


declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  constructor(private router: Router,
    private databaseManipulationService: DatabaseManipulationService, private dynamicScriptLoader: DynamicScriptLoaderService) { }


  ngOnInit() {
    this.getAllOrdersByStatus();
  }

  public orders: GetOrderDTO[] = new Array();

  intializeUserDatatableConfiguration(instant: any) {

    $("#ordersTable").length && $("#ordersTable").DataTable({

      dom: "Bfrtip",
      buttons: [{
        extend: "copy",
        className: "btn-sm",
        text: "نسخ"
      }, {
        extend: "csv",
        className: "btn-sm"
      }, {
        extend: "excel",
        className: "btn-sm"
      }, {
        extend: "pdf",
        className: "btn-sm"
      }, {
        extend: "print",
        className: "btn-sm",
        text: "طباعة"
      }],
      responsive: !0,
      data: this.orders,
      columns: [

        { data: 'ID', title: 'كود الطلب' },
        { data: 'total', title: 'الإجمالي' },
        { data: 'shippingAmount', title: 'مصاريف الشحن' },
        { data: 'userName', title: 'الإسم' },
        { data: 'status', title: 'الحالة' },
        {
          data: null,
          className: "center",
          "render": function (data, type, row, meta) {
            return '<a id="view_' + data.ID + '" class="on-default order_view"><i class="fa fa-eye" style="cursor:pointer"></i></a>';
          }
        }

      ],
      "language": {
        "paginate": {
          "previous": "السابق",
          "next": "التالي"
        },
        "info": "يتم عرض _START_ إلي _END_ من_TOTAL_",
        "infoEmpty": "يتم عرض 0  من 0",
        "infoFiltered": "(من إجمالي _MAX_ منتج)",
        "zeroRecords": "لا يوجد نتائج بحث",
        "sSearch": "بحث : "

      }
    });


    $('#ordersTable').on('click', 'a.order_view', (e, id) => {

      e.preventDefault();
      let elementID = e.currentTarget.attributes["id"].value;
      let orderID = elementID.split('_')[1];
      let tempItem = instant.orders.filter(x => x.ID == orderID)[0];
      if(tempItem.status == "مكتمل"){
        instant.router.navigate(['/home/view-order-details', { id: orderID }]);
      }
      else{
        instant.router.navigate(['/home/confirm-order', { id: orderID }]);
      }
    });

  }

  getAllOrdersByStatus() {
    this.dynamicScriptLoader.showSpinner();
    this.databaseManipulationService.GetOrdersByStatus().subscribe(response => {

      this.orders = response;
      this.intializeUserDatatableConfiguration(this);

    }, () => { }, () => {
      this.dynamicScriptLoader.hideSpinner();
    });
  }

}
