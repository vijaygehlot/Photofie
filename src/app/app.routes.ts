import { Routes } from '@angular/router';

// import { LoginComponent } from './login/login.component';
// import { SignupComponent } from './signup/signup.component';
// // import { HeaderComponent } from './header/header.component';
// import { UserComponent } from './user/user.component';
// import { UserResolver } from './user/user.resolver';
// import { AuthGuard } from './core/auth.guard';


import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { SearcheditemComponent } from './searcheditem/searcheditem.component'
import { HeartComponent } from './heart/heart.component'

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path:'searcheditem',component:SearcheditemComponent},
  { path:'heart',component:HeartComponent}
];
