import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';
import { Product } from 'src/app/models/product.model';
import { DatabaseManipulationService } from 'src/app/services/database-manipulation.service';
import { Router } from '@angular/router';
import { EditViewProductService } from 'src/app/services/edit-view-product.service';
import { strictEqual } from 'assert';
import { DeleteProductDTO } from 'src/app/models/DeleteProductDTO.model';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})

export class ViewProductsComponent implements OnInit, AfterViewInit {

  products: Product[] = new Array();

  constructor(private router: Router, private dynamicScriptLoader: DynamicScriptLoaderService,
    private databaseManipulationService: DatabaseManipulationService, private editViewProductService: EditViewProductService) {

  }

  ngOnInit() {

    this.getAllProducts();

  }

  ngAfterViewInit() {

    this.dynamicScriptLoader.intializeJqueryCore();
    this.dynamicScriptLoader.intializeJqueryApp();
  }

  intializeProductDatatableConfiguration(instant: any) {

    $("#productsTable").length && $("#productsTable").DataTable({
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
      data: this.products,
      columns: [
        { data: 'name', title: 'الإسم' },
        { data: 'parentCategoryName', title: 'القسم' },
        { data: 'priceBefore', title: 'السعر قبل' },
        { data: 'name', title: 'السعر بعد' },
        { data: 'priceAfter', title: 'التقييم' },
        {
          data: null,
          className: "center",
          "render": function (data, type, row, meta) {
            return '<a id="edit_' + data.ID + '" class="on-default product_edit"><i class="fa fa-pencil" style="cursor:pointer"></i></a> &nbsp;&nbsp;&nbsp;&nbsp; <a class="on-default product_delete" id="remove_' + data.ID + '"><i class="fa fa-trash-o"></i></a>'
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


    $('#productsTable').on('click', 'a.product_edit', (e, id) => {

      e.preventDefault();
      let elementID = e.currentTarget.attributes["id"].value;
      let productID = elementID.split('_')[1];
      instant.editViewProductService.EditedProduct = instant.products.filter(x => x.ID == productID)[0];
      instant.router.navigate(['/home/edit-product', { id: productID }]);
    });


    $('#productsTable').on('click', 'a.product_delete', (e, id) => {

      e.preventDefault();
      let elementID = e.currentTarget.attributes["id"].value;
      let productID = elementID.split('_')[1];

      swal.fire({
        title: 'هل متأكد من الحذف ؟',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'إلغاء',
        confirmButtonText: 'حذف'
      }).then((result) => {
        if (result.value) {
          let deleteProductItem : DeleteProductDTO = new DeleteProductDTO();
          deleteProductItem.productID = productID;
          deleteProductItem.images = this.products.filter(x => x.ID == productID)[0].images.map(x => x.imageUrl);
          this.dynamicScriptLoader.showSpinner();
          this.databaseManipulationService.deleteProduct(deleteProductItem).subscribe(response => {
            if (response == 0) {
              
              $("#productsTable").dataTable().fnDestroy()
              instant.getAllProducts();

              swal.fire(
                {
                  title: "تم بنجاح",
                  text: "لقد تم حذف المنتج",
                  type: "success",
                  confirmButtonColor: '#4fa7f3',
                  showConfirmButton: false,
                });
              }
          },()=>{},()=>{
            this.dynamicScriptLoader.hideSpinner();
          });
        }
      });

    });

  }

  navigateToAddProduct(){
    this.router.navigate(['/home/add-product']);
  }


  getAllProducts() {

    this.dynamicScriptLoader.showSpinner();
    this.databaseManipulationService.getProducts().subscribe(response => {

      this.products = response;
      this.intializeProductDatatableConfiguration(this);

    },response => {},()=>{
      this.dynamicScriptLoader.hideSpinner();
    });
  }


}
