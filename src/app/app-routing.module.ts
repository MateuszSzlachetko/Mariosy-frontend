import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { ReceivedComponent } from './components/user/received/received.component';
import { LoginComponent } from './shared/login/login.component';
import { SentComponent } from './components/user/sent/sent.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: ':id/received', component: ReceivedComponent },
      { path: ':id/sent', component: SentComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
