import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective {

  constructor(private _demoSubSrv: DataService) { }

  validate(control: AbstractControl): Observable<ValidationErrors> | null {
    //implémenter la validation
    return this._demoSubSrv.checkEmail(control).pipe(
      map(col => {

        if (col) {
          return {
            emailExistant: 'L\'email existe déjà dans la base de données'
          }
        }

      })
    );
  }

}
