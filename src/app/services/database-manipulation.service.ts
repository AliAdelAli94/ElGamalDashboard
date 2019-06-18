import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { AppSettings } from '../AppSettings';
import { Product } from '../models/product.model';
import { DeleteProductDTO } from '../models/DeleteProductDTO.model';
import { UserDTO } from '../models/UserDTO.model';
import { RegisterDTO } from '../models/RegisterDTO.model';
import { CategoryDTO2 } from '../models/CategoryDTO2.model';
import { CheckProductExistDTO } from '../models/CheckProductExistDTO.model';


@Injectable({
  providedIn: 'root'
})
export class DatabaseManipulationService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(AppSettings.webApiUrl + "category/getallcategories");
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(AppSettings.webApiUrl + "Product/GetAllProducts");
  }

  addCategory(Category): Observable<any> {

    return this.httpClient.post(AppSettings.webApiUrl + "Category/AddCategory/", Category, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  uploadImages(folderName: string, filesToUpload: FileList, editMode: string, oldImagesUrls: string[]): Observable<any> {
    let formData: FormData = new FormData();
    formData.append("EditMode", editMode);
    formData.append("FolderName", folderName);
    formData.append("oldImagesUrls", (oldImagesUrls != null) ? oldImagesUrls.join(';') : null);

    for (let x = 0; x < filesToUpload.length; x++) {
      formData.append("Files[]", filesToUpload[x], filesToUpload[x].name);
    }
    return this.httpClient.post(AppSettings.webApiUrl + "Utils/UploadImages/", formData);
  }

  checkIfProductExist(item: CheckProductExistDTO): Observable<number> {
    return this.httpClient.post<number>(AppSettings.webApiUrl + "Product/CheckIfProductExits/",item);
  }


  addProduct(item: any): Observable<any> {

    return this.httpClient.post(AppSettings.webApiUrl + "Product/AddProduct/", item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  editProduct(item: Product): Observable<any> {

    return this.httpClient.post(AppSettings.webApiUrl + "Product/EditProduct/", item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  deleteProduct(item: any): Observable<any> {

    return this.httpClient.post(AppSettings.webApiUrl + "Product/DeleteProduct/", item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  login(item: any): Observable<any> {

    return this.httpClient.post(AppSettings.webApiUrl + "User/Login/", item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  GetAllUsers(role : string): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(AppSettings.webApiUrl + "User/GetAllUsers/"+role);
  }


  registerUser(item: RegisterDTO): Observable<any> {

    return this.httpClient.post(AppSettings.webApiUrl + "User/RegisterUser/", item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  deleteUser(item: string): Observable<any> {

    return this.httpClient.post(AppSettings.webApiUrl + "User/DeleteUser/"+item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  GetAllCategoriesDashboard(): Observable<CategoryDTO2[]> {
    return this.httpClient.get<CategoryDTO2[]>(AppSettings.webApiUrl + "Category/GetAllCategoriesDashboard");
  }

  deleteCategory(item: string): Observable<any> {

    return this.httpClient.post(AppSettings.webApiUrl + "Category/DeleteCategory/"+item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  editCategory(item: Category): Observable<any> {

    return this.httpClient.post(AppSettings.webApiUrl + "Category/EditCategory/",item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  



}
