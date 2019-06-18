import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseManipulationService } from 'src/app/services/database-manipulation.service';
import { EditViewCategoryService } from 'src/app/services/edit-view-category.service';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';
import { CategoryDTO2 } from 'src/app/models/CategoryDTO2.model';


declare var swal : any;
declare var $ : any;

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  constructor(private router: Router,
    private databaseManipulationService: DatabaseManipulationService,
    private editViewCategoryService :EditViewCategoryService,private dynamicScriptLoader : DynamicScriptLoaderService) { }

  categories : CategoryDTO2[] = new Array();

  ngOnInit() {
    this.getAllCategories();
  }


  intializeUserDatatableConfiguration(instant: any) {

    $("#categoriesTable").length && $("#categoriesTable").DataTable({
    
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
      data: this.categories,
      columns: [

        { data: 'name', title: 'الإسم' },
        { data: 'parentCategoryName', title: 'داخل قسم' },
        {
          data: null,
          className: "center",
          "render": function (data, type, row, meta) {
            return '<a id="edit_' + data.ID + '" class="on-default category_edit"><i class="fa fa-pencil" style="cursor:pointer"></i></a> &nbsp;&nbsp;&nbsp;&nbsp; <a class="on-default category_delete" id="remove_' + data.ID + '"><i class="fa fa-trash-o"></i></a>'
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


    $('#categoriesTable').on('click', 'a.category_edit', (e, id) => {

      e.preventDefault();
      let elementID = e.currentTarget.attributes["id"].value;
      let categoryID = elementID.split('_')[1];
      instant.editViewCategoryService.EditedCategory = instant.categories.filter(x => x.ID == categoryID)[0];
      instant.router.navigate(['/home/edit-category', { id: categoryID }]);
    });


    $('#categoriesTable').on('click', 'a.category_delete', (e, id) => {

      e.preventDefault();
      let elementID = e.currentTarget.attributes["id"].value;
      let categoryID = elementID.split('_')[1];

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
          this.dynamicScriptLoader.showSpinner();
          this.databaseManipulationService.deleteCategory(categoryID).subscribe(response => {
            if (response == 0) {
              
              $("#categoriesTable").dataTable().fnDestroy()
              instant.getAllCategories();

              swal.fire(
                {
                  title: "تم بنجاح",
                  text: "لقد تم حذف القسم",
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

  getAllCategories() {
this.dynamicScriptLoader.showSpinner();
    this.databaseManipulationService.GetAllCategoriesDashboard().subscribe(response => {

      this.categories = response;
      this.intializeUserDatatableConfiguration(this);

    },()=>{},()=>{
      this.dynamicScriptLoader.hideSpinner();
    });
  }

  navigateToAddCategory(){
    this.router.navigate(['/home/add-category']);
  }

}
