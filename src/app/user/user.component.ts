import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss']
})
export class UserComponent implements OnInit{

  search1=[];searched=[];

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    private ser: UserserviceService,
    public drouter: Router
  ) {

    // console.log("asd",this.user);

  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    })
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ]
    });
  }


  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }


  search(value)
  {
    // this.ser.search_pic()
    // this.searched.length=0;
    this.search1=this.ser.search;
    // console.log("hfdgfdh",this.search1,value)
    for(let i=0;i<this.search1.length;i++)
    {
      // console.log(this.search1.length);
      var s=this.search1[i].name;
      if(s.indexOf(value)>=0)
      {
        this.searched.push(this.search1[i]);
        this.ser.searcheditem=this.searched;
        this.drouter.navigate(['searcheditem']);  
      }
      if(this.searched.length==0){
 
        this.drouter.navigate(['heart']);
      }
      
    }
    
    // console.log(this.searched)

    // else{
     
    // }

  }

}
