import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';
import { DatabaseManipulationService } from 'src/app/services/database-manipulation.service';
import { Category } from 'src/app/models/category.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


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

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private databaseManipulationService: DatabaseManipulationService, private router: Router) {
    this.saveForm = false;
  }

  ngOnInit() {

    this.getAllCategories();
  }

  ngAfterViewInit() {

    this.dynamicScriptLoader.intializeJqueryCore();
    this.dynamicScriptLoader.intializeJqueryApp();
  }


  addCategory() {
    this.saveForm = true;
    if (this.currentCategory) {
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
      })
    }
  }

  cancel() {
    this.router.navigateByUrl('/home/start-page');
  }

  getAllCategories() {

    this.databaseManipulationService.getCategories().subscribe(response => {
      this.categories = response;
    });
  }




}
