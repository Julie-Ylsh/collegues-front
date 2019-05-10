import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  //Création des variables matricule et mot de passe qui seront chargées dans le formulaire
  matricule: string;
  motDePasse: string;

  //Boolean pour afficher ok quand la connexion est faite
  identificationOk: boolean;


  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.identificationOk = false;
    console.log(this.identificationOk)
    this.identificationOk = this._userService.isLoggedIn();
    console.log(this.identificationOk)
  }

  //Méthode pour utiliser usersevice et se connecter
  connexion() {
    this._userService.postAuthentification(this.matricule, this.motDePasse).subscribe(() => {
      console.log('connexion ok');
      this.identificationOk = true;
    }, err => {
      console.log(err.message);
      return alert(`Les informations de connexion ne semblent pas correctes`)
    });
  }

  deconnexion(){
  this._userService.postLogOut().subscribe(() => {
    console.log('déconnexion ok');
    this.identificationOk = false});
  
  }

}
