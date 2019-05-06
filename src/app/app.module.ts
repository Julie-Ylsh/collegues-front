import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import {NgbModule,NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CollegueComponent } from './collegue/collegue.component';
import { RechercheCollegueParNomComponent } from './recherche-collegue-par-nom/recherche-collegue-par-nom.component';
import { HttpClientModule } from '@angular/common/http';
import { CreerCollegueComponent } from './creer-collegue/creer-collegue.component';
import { EmailValidatorDirective } from './validators/email-validator.directive';



@NgModule({
  declarations: [
    AppComponent,
    CollegueComponent,
    RechercheCollegueParNomComponent,
    CreerCollegueComponent,
    EmailValidatorDirective
      ],
  imports: [
    BrowserModule, NgbModule, ReactiveFormsModule, HttpClientModule, FormsModule 
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { 
  
}

export class MonModule {}


