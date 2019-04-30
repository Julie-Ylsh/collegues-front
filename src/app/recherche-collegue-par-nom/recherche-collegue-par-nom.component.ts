import { Component, OnInit } from '@angular/core';
import { collegueMock } from '../mock/collegues.mock'
import { Collegue } from '../models/Collegue';

@Component({
  selector: 'app-recherche-collegue-par-nom',
  templateUrl: './recherche-collegue-par-nom.component.html',
  styleUrls: ['./recherche-collegue-par-nom.component.css']
})
export class RechercheCollegueParNomComponent implements OnInit {
  nomCollegue: string;
  //collegue: Collegue;
  collegueTab: Collegue[] = collegueMock;
  listeMats: string[] = [];
  afficher = false;
  messageErreur:String = null;
  constructor() { }

  ngOnInit() {
  }

  rechercherCollegue(saisieValue: string) {
    this.nomCollegue = saisieValue;

    for (let col of this.collegueTab) {
      if (col.nom == saisieValue) {
        this.listeMats.push(col.matricule);
        this.afficher = true;
      }
    }
if (this.listeMats.length == 0){
   this.messageErreur = 'Pas de collègue trouvé'
}
  }




}
