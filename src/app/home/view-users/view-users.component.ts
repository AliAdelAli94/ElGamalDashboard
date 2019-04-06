import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/UserDTO.model';
import { DatabaseManipulationService } from 'src/app/services/database-manipulation.service';
import { Router } from '@angular/router';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';

declare var $ : any;
declare var swal : any;

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  constructor(private router: Router,
    private databaseManipulationService: DatabaseManipulationService,private dynamicScriptLoaderService : DynamicScriptLoaderService) { }

  users : UserDTO[] = new Array();

  ngOnInit() {

    this.getAllUsers();
  }


  intializeUserDatatableConfiguration(instant: any) {

    $("#usersTable").length && $("#usersTable").DataTable({
    
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
      data: this.users,
      columns: [

        { data: 'userName', title: 'الإسم' },
        { data: 'email', title: 'الإيميل' },
        { data: 'phoneNumber', title: 'رقم الهاتف' },
        { data: 'address', title: 'العنوان' },
        { data: 'birthDate', title: 'تاريخ الميلاد' },
        {
          data: null,
          className: "center",
          "render": function (data, type, row, meta) {
            return '<a class="on-default user_delete" id="remove_' + data.ID + '"><i class="fa fa-trash-o"></i></a>'
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


    $('#usersTable').on('click', 'a.user_delete', (e, id) => {

      e.preventDefault();
      let elementID = e.currentTarget.attributes["id"].value;
      let userID = elementID.split('_')[1];

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
          this.dynamicScriptLoaderService.showSpinner();
          this.databaseManipulationService.deleteUser(userID).subscribe(response => {
            if (response == 0) {
              
              $("#usersTable").dataTable().fnDestroy()
              instant.getAllUsers();

              swal.fire(
                {
                  title: "تم بنجاح",
                  text: "لقد تم حذف المستخدم",
                  type: "success",
                  confirmButtonColor: '#4fa7f3',
                  showConfirmButton: false,
                });
              }
          },()=>{},()=>{
            this.dynamicScriptLoaderService.hideSpinner();
          });
        }
      });

    });

  }

  getAllUsers() {

    this.dynamicScriptLoaderService.showSpinner();
    this.databaseManipulationService.GetAllUsers().subscribe(response => {

      this.users = response;
      this.intializeUserDatatableConfiguration(this);

    },()=>{},()=>{
      this.dynamicScriptLoaderService.hideSpinner();
    });
  }

  navigateToAddUser(){
    this.router.navigate(['/home/add-user']);
  }

}
