import { Component } from '@angular/core';
import { Collegue } from './models/Collegue';
import{DataService} from './services/data.service'

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styles: []
})
export class AppComponent {
  constructor(private _srv:DataService){}

  julie = this._srv.recupererCollegueCourant();
 
  title = 'collegues-front';
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  
}
