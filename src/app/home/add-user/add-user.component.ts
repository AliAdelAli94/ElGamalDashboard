import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RegisterDTO } from 'src/app/models/RegisterDTO.model';
import { Router } from '@angular/router';
import { DatabaseManipulationService } from 'src/app/services/database-manipulation.service';
import { NgForm } from '@angular/forms';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';

declare var jQuery : any;
declare var $ : any;
declare var swal : any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, AfterViewInit{

  @ViewChild('addUserForm') public addUserForm :NgForm
  currentUser : RegisterDTO = new RegisterDTO();
  saveForm : boolean = false;
  passwordNotMatchFlag = false;

  constructor( private databaseManipulationService: DatabaseManipulationService, private router: Router,private dynamicScriptLoaderService : DynamicScriptLoaderService) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.intializeElements();
  }

  addUser(){
    
    this.currentUser.birthDate =  $("#birthDatePicker").val();
    this.saveForm = true;
    if (this.currentUser) {
      this.dynamicScriptLoaderService.showSpinner();
      this.databaseManipulationService.registerUser(this.currentUser).subscribe((response) => {
        if (response == 0) {

          swal.fire(
            {
              title: "تم بنجاح",
              text: "لقد تم حفظ طلبك",
              type: "success",
              confirmButtonColor: '#4fa7f3',
              showConfirmButton: false,
            }
          );

          this.saveForm = false;
          this.addUserForm.reset();
        
        }
        if(response == 1)
        {
          swal.fire(
            {
              title: "فشل طلبك",
              text: "هذا المستخدم موجود من قبل",
              type: "error",
              confirmButtonColor: '#4fa7f3',
              showConfirmButton: false,
            }
          );
        }
      },()=>{},()=>{
        this.dynamicScriptLoaderService.hideSpinner();
      })
    }
  }

  checkPasswords(){
    if(this.currentUser.confirmPassword == this.currentUser.password)
    {
      this.passwordNotMatchFlag = false;
    }
    else
    {
      this.passwordNotMatchFlag = true;
    }
  }

  intializeElements(){

    jQuery('#birthDatePicker').datepicker({
      autoclose: true,
      todayHighlight: true
  });

  }

  cancel(){
    this.router.navigateByUrl('/home/start-page');
  }

}
