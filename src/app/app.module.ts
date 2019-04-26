import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgbModule,NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CollegueComponent } from './collegue/collegue.component';


@NgModule({
  declarations: [
    AppComponent,
    CollegueComponent
      ],
  imports: [
    BrowserModule, NgbModule, ReactiveFormsModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { 
  
}


