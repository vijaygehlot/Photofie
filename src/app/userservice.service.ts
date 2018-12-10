import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  search=[];
  searcheditem=[];
  uid;
  emailaddress;

  // search_pic()
  // {
  //   console.log("user")
  //   return this.search;
  // }

  constructor() {
    // this.searcheditem=[];
   }
}
