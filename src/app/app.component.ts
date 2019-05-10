import { Component } from '@angular/core';
import{DataService} from './services/data.service'

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styles: [],
  providers: [DataService]
})
export class AppComponent {
  constructor(){}
 
  // Used to toggle the menu on small screens when clicking on the menu button
toggleFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
  } else {
      x.className = x.className.replace(" w3-show", "");
  }
}

// Change style of navbar on scroll
deroule() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
    } else {
        navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
    }
}

  
}
