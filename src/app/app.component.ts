import { Component } from '@angular/core';
import { Collegue } from './models/Collegue';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styles: []
})
export class AppComponent {
  Julie = new Collegue ('A32', 'Jeltsch', 'Julie', 'julie.bouaye@hotmail.fr', '1994-12-4', 'urlphoto');
  title = 'collegues-front';
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

}
