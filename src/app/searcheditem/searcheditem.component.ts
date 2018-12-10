import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-searcheditem',
  templateUrl: './searcheditem.component.html',
  styleUrls: ['./searcheditem.component.css']
})
export class SearcheditemComponent implements OnInit {

   searcheditem1=[];

   isd;
   mod=null;
   cap=null;
   fil=null;
   nam=null;
   uidd;
   ind;

  constructor(private ser: UserserviceService,public db1: AngularFirestore) { 
    
  this.uidd=ser.uid;
  this.searcheditem1=this.ser.searcheditem;
  // this.ser.searcheditem=[];
  this.searcheditem1.sort();
  
  }

  mymodal(i,indx)
{
 
  this.isd=i;
  this.ind=indx;
  this.mod=null;
  this.cap=null;
  this.fil=null;
  this.nam=null;
  var docRef= this.db1.collection(this.uidd).ref.doc(i);
   docRef.get().then((doc) =>{
          
          this.mod=doc.data().x;
          this.cap=doc.data().caption;
          this.fil=doc.data().filter;
          this.nam=doc.data().name;

      });

      return this.mod,this.cap,this.fil,this.nam;
}

delete()
{
 
  this.db1.collection(this.uidd).doc(this.isd).delete().then(()=> {
    // console.log("Document successfully deleted!",this.ind);
    this.searcheditem1.splice(this.ind,1);
}).catch(function(error) {
    // console.error("Error removing document: ", error);
});

const storageRef: firebase.storage.Reference = firebase.storage().ref('/images/'+this.uidd+'/'+this.isd);

// Delete the file
storageRef.delete().then(function() {
  // File deleted successfully
  
}).catch(function(error) {
  

});
}

  ngOnInit() {
  }

}
