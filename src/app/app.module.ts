import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { MariosInfoComponent } from './components/home/marios-info/marios-info.component';
import { MariosComponent } from './components/marios/marios.component';
import { MariosGridComponent } from './shared/marios-grid/marios-grid.component';
import { ReceivedComponent } from './components/user/received/received.component';
import { LoginComponent } from './shared/login/login.component';
import { FormsModule } from '@angular/forms';
import { SentComponent } from './components/user/sent/sent.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    HomeComponent,
    MariosInfoComponent,
    MariosComponent,
    MariosGridComponent,
    ReceivedComponent,
    LoginComponent,
    SentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
