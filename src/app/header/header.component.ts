import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import {  FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { 
  AngularFirestore, 
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { UserserviceService } from '../userservice.service';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  imgurl :string="https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683__340.png";
  fileup : File=null;
  file;
  name;
  i;
  mod=null;
  loc=[];
  cap=null;
  fil=null;
  search1:any=[];
  array:any=[];
  data:any=[];
  mode=true;
  moon1="filter-normal"; 
  ind;
  storageRef1;
  ref;
  task;
  uploadProgress;
  down;
  caption="";
  y;
  sid;
  name1; 
  email; uid; emailVerified;
  x;
  localsearch=[];angle;
  nam=null;
  percentage;
  snapshot;
  progress;
  uptask;searchedhere;
  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;
  emailaddress;
  
  constructor(public http:HttpClient,public db1: AngularFirestore,public db: AngularFireDatabase,public ser:UserserviceService,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
  
  ) {

   

    var user = firebase.auth().currentUser;
    if (user != null) {
      this.name1 = user.displayName;
      this.email = user.email;
      this.emailVerified = user.emailVerified;
      this.uid = user.uid; 
      var res = this.email.split("@");
      res.splice(1,1);
      // console.log(res)
      this.email=res[0];
      ser.uid=this.uid;
      
    }
     ser.search.length=0;
     this.db1.collection(this.uid).ref.get().then(function(querySnapshot) {
      querySnapshot.forEach((doc) => {
        var local=[]
         
          ser.search.push(doc.data())          
      
      });
      
    });

      
    this.db1.collection(this.uid).doc("pl,mkiujnjhyhbhgtgvfrerdfcdewsxzaq23edfr45tgbhy67ujm89ol.").set({
     
  }) 

  db1.collection(this.uid).doc("pl,mkiujnjhyhbhgtgvfrerdfcdewsxzaq23edfr45tgbhy67ujm89ol.").delete().then(function() {
   // console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
    this.array = db1.collection(this.uid).valueChanges();


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

delete()
{
console.log(this.i)
  this.db1.collection(this.uid).doc(this.i).delete().then(function() {
   // console.log("Document successfully deleted!");
}).catch(function(error) {
    // console.error("Error removing document: ", error);
});

// console.log(this.fileup.name)
const storageRef: firebase.storage.Reference = firebase.storage().ref('/images/'+this.uid+'/'+this.i);

// Delete the file
storageRef.delete().then(function() {
  // File deleted successfully
  // console.log("suss")
}).catch(function(error) {
  // console.log("weeeeeerror",error)
  // Uh-oh, an error occurred!
});

}

mymodal(i)
{
  
  this.i=i;
  this.mod=null;
  this.cap=null;
  this.fil=null;
  this.nam=null;
  var docRef= this.db1.collection(this.uid).ref.doc(i);
  docRef.get().then((doc) =>{
          
          this.mod=doc.data().x;
          this.cap=doc.data().caption;
          this.fil=doc.data().filter;
          this.nam=doc.data().name;
         
      });

      return this.mod,this.cap,this.fil,this.nam;
}
  handleFileInput(file: FileList)
  {
    this.progress=0;
    this.fileup=file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
    this.imgurl = event.target.result;   
    }
    reader.readAsDataURL(this.fileup);
    
    this.file=file;
    // console.log(this.file);
    
    
  }

  upload()
  {
  
    const metaData ={'contentType':this.fileup.type};
    this.x=this.fileup.name;
    this.x = this.x.substring(0, this.x.lastIndexOf('.'));
    const storageRef: firebase.storage.Reference = firebase.storage().ref('/images/'+this.uid+'/'+this.x);
    this.storageRef1=storageRef;
    const uploadTask:firebase.storage.UploadTask = storageRef.put(this.fileup,metaData);
    this.uptask=uploadTask;
    this.uptask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
      // upload in progress
      this.progress = Math.floor((this.uptask.snapshot.bytesTransferred / this.uptask.snapshot.totalBytes) * 100)
      // console.log("asdsa",this.progress)
      if(this.progress==100)
      {
        // this.progress=0;
        this.uptask=null;
      }
    },

    (error) => {
      // upload failed
      console.log(error)
    },
    () => {

    
    }
    
  );


    storageRef.put(this.fileup)
   .then(snapshot => {
       return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
   })

   .then(downloadURL => {

      this.y=this.fileup.name;
      this.y = this.y.substring(0, this.y.lastIndexOf('.'));

      this.db1.collection(this.uid).doc(this.x).set({
        name:this.y,
        x:downloadURL,
        caption:this.caption,
        filter:this.moon1
    })
    this.caption="";
    this.moon1="filter-normal"
      return downloadURL;
     
   })

   }

   logout(){
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }


  moon()
  {
     this.moon1="filter-moon"
     
    return this.moon1;
  }

  normal()
  {
     this.moon1="filter-normal"
     
    return this.moon1;
  }

  nine()
  {
     this.moon1="filter-1977"
     
    return this.moon1;
  }

  aden1()
  {
     this.moon1="filter-aden"
     
    return this.moon1;
  }

  Amaro()
  {
     this.moon1="filter-amaro"
     
    return this.moon1;
  }

  ash()
  {
     this.moon1="filter-ashby"
     
    return this.moon1;
  }

  brannan()
  {
     this.moon1="filter-brannan"
     
    return this.moon1;
  }

  brooklyn()
  {
     this.moon1="filter-brooklyn"
     
    return this.moon1;
  }

  charmes()
  {
     this.moon1="filter-charmes"
     
    return this.moon1;
  }

  clarendon()
  {
     this.moon1="filter-clarendon"
     
    return this.moon1;
  }

  crema()
  {
     this.moon1="filter-crema"
     
    return this.moon1;
  }

  dogpatch()
  {
     this.moon1="filter-dogpatch"
     
    return this.moon1;
  }

  earlybird()
  {
     this.moon1="filter-earlybird"
     
    return this.moon1;
  }

  Gingham()
  {
     this.moon1="filter-gingham"
     
    return this.moon1;
  }

  Ginza()
  {
     this.moon1="filter-ginza"
     
    return this.moon1;
  }

  Hefe()
  {
     this.moon1="filter-hefe"
     
    return this.moon1;
  }

  Helena()
  {
     this.moon1="filter-helena"
     
    return this.moon1;
  }

  Hudson()
  {
     this.moon1="filter-hudson"
     
    return this.moon1;
  }

  Inkwell()
  {
     this.moon1="filter-inkwell"
     
    return this.moon1;
  }

  Kelvin()
  {
     this.moon1="filter-Kelvin"
     
    return this.moon1;
  }

  Juno()
  {
     this.moon1="filter-juno"
     
    return this.moon1;
  }

  Lark()
  {
     this.moon1="filter-lark"
     
    return this.moon1;
  }

  Lo()
  {
     this.moon1="filter-lo-Fi"
     
    return this.moon1;
  }

  Ludwig()
  {
     this.moon1="filter-ludwig"
     
    return this.moon1;
  }

  Maven()
  {
     this.moon1="filter-maven"
     
    return this.moon1;
  }

  Mayfair()
  {
     this.moon1="filter-mayfair"
     
    return this.moon1;
  }

  Nashville()
  {
     this.moon1="filter-nashville"
     
    return this.moon1;
  }

  Perpetua()
  {
     this.moon1="filter-perpetua"
    
    return this.moon1;
  }

  Poprocket()
  {
     this.moon1="filter-poprocket"
    return this.moon1;
  }

  Reyes()
  {
     this.moon1="filter-reyes"
    return this.moon1;
  }


}
