import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { HeartComponent } from './heart/heart.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserComponent } from './user/user.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SearcheditemComponent } from './searcheditem/searcheditem.component';


const environment = {
  production: false,
  firebase: {
    // apiKey: "AIzaSyCHGrYe12mZXsA7bbEyk2CPznD6NIANkec",
    // authDomain: "photogram-7823.firebaseapp.com",
    // databaseURL: "https://photogram-7823.firebaseio.com",
    // projectId: "photogram-7823",
    // storageBucket: "photogram-7823.appspot.com",
    // messagingSenderId: "125184111739"

    apiKey: 'AIzaSyCARyf-cM6sAV7Qiki_tr901tLlfge1FfY',
    authDomain: 'photofie-abcc1.firebaseapp.com',
    databaseURL: 'https://photofie-abcc1.firebaseio.com',
    projectId: 'photofie-abcc1',
    storageBucket: 'photofie-abcc1.appspot.com',
    messagingSenderId: '1093453447084'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    HeartComponent,
    UserComponent,
    SearcheditemComponent,
    // NgMasonryGridModule,
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,AngularFirestoreModule,
    AngularFireAuthModule,FormsModule,HttpClientModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
     AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AuthService, UserService,UserResolver, AuthGuard,AngularFirestore,AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
