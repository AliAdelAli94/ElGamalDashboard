import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';
import { DatabaseManipulationService } from 'src/app/services/database-manipulation.service';
import { Category } from 'src/app/models/category.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EditViewCategoryService } from 'src/app/services/edit-view-category.service';


declare var swal: any;

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html'
})

export class AddCategoryComponent implements AfterViewInit, OnInit {

  @ViewChild('addCategoryForm') public addCategoryForm :NgForm
  categories: Category[];
  currentCategory: Category = new Category();
  saveForm: boolean;
  undefiend : any;
  routedID: string;
  editableMode: boolean = false;


  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, 
    private databaseManipulationService: DatabaseManipulationService, private router: Router,
    private activatedRoute: ActivatedRoute,private editViewCategoryService :EditViewCategoryService) {
    this.saveForm = false;
  }

  ngOnInit() {

    this.getAllCategories();
    this.routedID = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.editViewCategoryService.EditedCategory) {
      if (this.editViewCategoryService.EditedCategory.ID == this.routedID) {
        this.currentCategory = this.editViewCategoryService.EditedCategory;
        this.editableMode = true;
      }
    }
  }

  ngAfterViewInit() {

    this.dynamicScriptLoader.intializeJqueryCore();
    this.dynamicScriptLoader.intializeJqueryApp();
  }


  addCategory() {
    this.saveForm = true;
    if (this.currentCategory) {
      this.dynamicScriptLoader.showSpinner();
      this.databaseManipulationService.addCategory(this.currentCategory).subscribe((response) => {
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
          this.getAllCategories();

          this.saveForm = false;
          this.addCategoryForm.reset();
          this.currentCategory.parentCategoryID = undefined;
        }
        if(response == 1)
        {
          swal.fire(
            {
              title: "فشل طلبك",
              text: "هذا القسم موجود من قبل",
              type: "error",
              confirmButtonColor: '#4fa7f3',
              showConfirmButton: false,
            }
          );
        }
      },()=>{},()=>{
        this.dynamicScriptLoader.hideSpinner();
      })
    }
  }

  editCategory() {
    this.saveForm = true;

    if (this.currentCategory) {
      this.dynamicScriptLoader.showSpinner();
      this.databaseManipulationService.editCategory(this.currentCategory).subscribe(response => {

        if (response == 0) {
          swal.fire(
            {
              title: "تم بنجاح",
              text: "لقد تم تعديل القسم",
              type: "success",
              confirmButtonColor: '#4fa7f3',
              showConfirmButton: false,
            }
          );
          this.saveForm = false;
          this.router.navigateByUrl('/home/view-categories');
        }
      },()=>{},()=>{
        this.dynamicScriptLoader.hideSpinner();
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/home/start-page');
  }

  getAllCategories() {

    this.dynamicScriptLoader.showSpinner();
    this.databaseManipulationService.getCategories().subscribe(response => {
      this.categories = response;
    },()=>{},()=>{
      this.dynamicScriptLoader.hideSpinner();
    });
  }




}
