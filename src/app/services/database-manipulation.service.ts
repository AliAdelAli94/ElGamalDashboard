import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { AppSettings } from '../AppSettings';


@Injectable({
  providedIn: 'root'
})
export class DatabaseManipulationService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(AppSettings.webApiUrl + "category/getallcategories");
  }

  addCategory(Category): Observable<any> {

    return this.httpClient.post(AppSettings.webApiUrl + "Category/AddCategory/", Category, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  uploadImages(folderName: string, filesToUpload: FileList): Observable<any> {
    let formData: FormData = new FormData();
    formData.append("FolderName", folderName);
    for (let x = 0; x < filesToUpload.length; x++) {
      formData.append("Files[]", filesToUpload[x], filesToUpload[x].name);
    }

    return this.httpClient.post(AppSettings.webApiUrl +  "Utils/UploadImages/",formData);
  }

  checkIfProductExist(productName:string):Observable<number>{
    return this.httpClient.get<number>(AppSettings.webApiUrl + "Product/CheckIfProductExits/"+productName);
  }


  addProduct(item:any): Observable<any> {

    return this.httpClient.post(AppSettings.webApiUrl + "Product/AddProduct/", item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
