import { Component, OnInit } from '@angular/core';
import { collegueMock } from '../mock/collegues.mock'
import { Collegue } from '../models/Collegue';
import{DataService} from '../services/data.service'

@Component({
  selector: 'app-recherche-collegue-par-nom',
  templateUrl: './recherche-collegue-par-nom.component.html',
  styleUrls: ['./recherche-collegue-par-nom.component.css'],
  
})
export class RechercheCollegueParNomComponent implements OnInit {
  nomCollegue: string;
  //collegue: Collegue;
  collegueTab: Collegue[] = collegueMock;
  listeMats: string[] = [];
  afficher = false;
  messageErreur:String = null;
  constructor(private _srv:DataService) { }

  ngOnInit() {
  }

  rechercherCollegue(saisieValue: string) {
    this.listeMats = this._srv.rechercherParNom(saisieValue);
    if (this.listeMats.length == 0) {
      this.messageErreur = 'Pas de collègue trouvé'
      this.afficher = false;
    }

    else {
      this.afficher = true;
    }
  }




}
