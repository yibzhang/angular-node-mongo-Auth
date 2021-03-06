import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { UserService } from './_services/user.service';
import { UserDetailComponent } from './user-detail/user-detail.component';

import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './_services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
