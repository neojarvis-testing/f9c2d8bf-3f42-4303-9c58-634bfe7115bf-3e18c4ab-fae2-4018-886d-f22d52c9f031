import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminaddclassComponent } from './components/adminaddclass/adminaddclass.component';
import { AdmineditclassComponent } from './components/admineditclass/admineditclass.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { AdminviewclassComponent } from './components/adminviewclass/adminviewclass.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { CookingImpComponent } from './components/cooking-imp/cooking-imp.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UseraddrequestComponent } from './components/useraddrequest/useraddrequest.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewappliedrequestComponent } from './components/userviewappliedrequest/userviewappliedrequest.component';
import { UserviewclassComponent } from './components/userviewclass/userviewclass.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
=======
import { AgGridModule } from 'ag-grid-angular';
>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
 
@NgModule({
  declarations: [
    AppComponent,
    AdminaddclassComponent,
    AdmineditclassComponent,
    AdminnavComponent,
    AdminviewappliedrequestComponent,
    AdminviewclassComponent,
    AdminviewfeedbackComponent,
    CookingImpComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    UseraddfeedbackComponent,
    UseraddrequestComponent,
    UsernavComponent,
    UserviewappliedrequestComponent,
    UserviewclassComponent,
    UserviewfeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
<<<<<<< HEAD
    ReactiveFormsModule
=======
    ReactiveFormsModule,
    AgGridModule
>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 