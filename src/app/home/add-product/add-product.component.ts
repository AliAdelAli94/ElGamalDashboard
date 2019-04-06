import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';
import { DatabaseManipulationService } from 'src/app/services/database-manipulation.service';
import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/models/image.model';
import { ProductOption } from 'src/app/models/ProductOption.model';
import { NgForm } from '@angular/forms';
import { EditViewProductService } from 'src/app/services/edit-view-product.service';

declare var swal: any;


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, AfterViewInit {


  currentProduct: Product = new Product();
  categories: Category[];
  saveForm: boolean = false;
  productFiles: FileList;
  productImagesModel: any;
  ExistedProductFalg: boolean = false;
  showOptionForm: boolean = false;
  currentOption: ProductOption = new ProductOption();
  saveOptionForm: boolean = false;
  repeatedOptionFlag: boolean = false;
  selectedOptionIndex: number = -1;
  optionEditMode: boolean = false;
  undefiend: any;
  routedID: string;
  editableMode: boolean = false;
  fireProductDocumentsFlag: boolean = false;
  imagesUrlsBeforeEdit: string[] = new Array();

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService,
    private databaseManipulationService: DatabaseManipulationService, private router: Router,
    private activatedRoute: ActivatedRoute, private editViewProductService: EditViewProductService) { }

  ngOnInit() {

    this.getAllCategories();
    this.routedID = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.editViewProductService.EditedProduct) {
      if (this.editViewProductService.EditedProduct.ID == this.routedID) {
        this.currentProduct = this.editViewProductService.EditedProduct;
        this.imagesUrlsBeforeEdit = this.currentProduct.images.map(x => x.imageUrl);
        this.fireProductDocumentsFlag = (this.currentProduct.images.length == 0) ? true : false;
        this.editableMode = true;
      }
    }
  }

  ngAfterViewInit() {
    this.dynamicScriptLoader.intializeJqueryCore();
    this.dynamicScriptLoader.intializeJqueryApp();
  }

  getAllCategories() {
    this.dynamicScriptLoader.showSpinner();
    this.databaseManipulationService.getCategories().subscribe(response => {
      this.categories = response;
    },()=>{},()=>{
      this.dynamicScriptLoader.hideSpinner();
    });
  }

  cancel() {
    this.router.navigateByUrl('/home/start-page');
  }

  handleFilesToUpload(files: FileList) {
    this.productFiles = files;
    this.currentProduct.images = [];
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.currentProduct.images.push(event.target.result);
      }
      reader.readAsDataURL(files.item(i))
    }
    this.fireProductDocumentsFlag = (files.length == 0) ? true : false;
  }

  editProduct(form: NgForm) {
    this.saveForm = true;
    this.fireProductDocumentsFlag = (this.currentProduct.images.length == 0) ? true : false;
    let tempImage: Image = new Image();

    if (this.productFiles) {
      if (this.productFiles.length > 0) {
        this.dynamicScriptLoader.showSpinner();
        this.databaseManipulationService.uploadImages("products", this.productFiles, "true", this.imagesUrlsBeforeEdit).subscribe(response => {
          let temp: Image = new Image();

          this.currentProduct.images = [];
          for (let h = 0; h < response.length; h++) {
            tempImage.imageUrl = JSON.parse(JSON.stringify(response[h]));
            this.currentProduct.images.push(JSON.parse(JSON.stringify(tempImage)));
          }

          this.databaseManipulationService.editProduct(this.currentProduct).subscribe(response => {
            if(response == 0){
              swal.fire(
                {
                  title: "تم بنجاح",
                  text: "لقد تم تعديل المنتج",
                  type: "success",
                  confirmButtonColor: '#4fa7f3',
                  showConfirmButton: false,
                }
              );
              form.reset();
              this.currentProduct = new Product();
              this.productImagesModel = null;
              this.saveForm = false;
              this.router.navigateByUrl('/home/view-products');
            }
          },()=>{},()=>{
            this.dynamicScriptLoader.hideSpinner();
          });

        });
      }
    }
    else {
      this.dynamicScriptLoader.showSpinner();
      this.databaseManipulationService.editProduct(this.currentProduct).subscribe(response => {

        if (response == 0) {
          swal.fire(
            {
              title: "تم بنجاح",
              text: "لقد تم تعديل المنتج",
              type: "success",
              confirmButtonColor: '#4fa7f3',
              showConfirmButton: false,
            }
          );
          form.reset();
          this.currentProduct = new Product();
          this.productImagesModel = null;
          this.saveForm = false;
          this.router.navigateByUrl('/home/view-products');
        }
      },()=>{},()=>{
        this.dynamicScriptLoader.hideSpinner();
      });
    }
  }

  saveChanges(form: NgForm) {
    this.dynamicScriptLoader.showSpinner();
    this.saveForm = true;
    this.fireProductDocumentsFlag = (this.currentProduct.images.length == 0) ? true : false;
    let tempImage: Image = new Image();
    this.databaseManipulationService.uploadImages("products", this.productFiles, "false", null).subscribe(response => {
      let temp: Image = new Image();

      this.currentProduct.images = [];
      for (let h = 0; h < response.length; h++) {
        tempImage.imageUrl = JSON.parse(JSON.stringify(response[h]));
        this.currentProduct.images.push(JSON.parse(JSON.stringify(tempImage)));
      }

      this.databaseManipulationService.addProduct(this.currentProduct).subscribe(response => {
        if (response == 0) {
          swal.fire(
            {
              title: "تم بنجاح",
              text: "لقد تم إضافة المنتج",
              type: "success",
              confirmButtonColor: '#4fa7f3',
              showConfirmButton: false,
            }
          );
          form.reset();
          this.currentProduct = new Product();
          this.productImagesModel = null;
          this.saveForm = false;
        }
      },()=>{},()=>{
        this.dynamicScriptLoader.hideSpinner();
      });

    });
  }

  checkIfProductExist() {
    if (this.currentProduct.name) {
      this.dynamicScriptLoader.showSpinner();
      this.databaseManipulationService.checkIfProductExist(this.currentProduct.name).subscribe(response => {
        if (response == 1) {
          this.ExistedProductFalg = true;
        }
        if (response == 0) {
          this.ExistedProductFalg = false;
        }
      },()=>{},()=>{
        this.dynamicScriptLoader.hideSpinner();
      });
    }
  }


  addNewOption() {
    this.showOptionForm = !this.showOptionForm;
  }

  saveOption(form: NgForm) {
    if (this.optionEditMode == true) {
      this.currentProduct.ProductOptions[this.selectedOptionIndex] = JSON.parse(JSON.stringify(this.currentOption));
      this.optionEditMode = false;
      this.selectedOptionIndex = -1;
      form.reset();
      this.showOptionForm = false;
    }
    else {
      if (this.currentProduct.ProductOptions.filter(x => x.optionText == this.currentOption.optionText).length > 0) {
        this.repeatedOptionFlag = true;
      }
      else {
        this.repeatedOptionFlag = false;
        this.currentProduct.ProductOptions.push(JSON.parse(JSON.stringify(this.currentOption)));
        form.reset();
        this.showOptionForm = false;
      }
    }

  }

  updateOption(index: number) {
    this.optionEditMode = true;
    this.selectedOptionIndex = index;
    this.showOptionForm = true;
    this.currentOption = JSON.parse(JSON.stringify(this.currentProduct.ProductOptions[index]));
  }

  deleteOption(index: number) {
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

        this.currentProduct.ProductOptions.splice(index, 1);
        swal.fire(
          {
            title: "تم بنجاح",
            text: "لقد تم الحذف",
            type: "success",
            confirmButtonColor: '#4fa7f3',
            showConfirmButton: false,
          }
        );
      }
    });
  }

  deleteComment(index: number) {
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

        this.currentProduct.Comments.splice(index, 1);
        swal.fire(
          {
            title: "تم بنجاح",
            text: "لقد تم الحذف",
            type: "success",
            confirmButtonColor: '#4fa7f3',
            showConfirmButton: false,
          }
        );
      }
    });
  }

  cancelOption() {
    this.selectedOptionIndex = -1;
    this.optionEditMode = false;
    this.showOptionForm = false;
  }

}
