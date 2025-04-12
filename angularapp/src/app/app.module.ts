import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminaddclassComponent } from './components/adminaddclass/adminaddclass.component';
import { AdmineditclassComponent } from './components/admineditclass/admineditclass.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminaddclassComponent,
    AdmineditclassComponent,
    AdminnavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
