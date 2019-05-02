import { Component, OnInit } from '@angular/core';
import { collegueMock } from '../mock/collegues.mock'
import { Collegue } from '../models/Collegue';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-recherche-collegue-par-nom',
  templateUrl: './recherche-collegue-par-nom.component.html',
  styleUrls: ['./recherche-collegue-par-nom.component.css'],

})
export class RechercheCollegueParNomComponent implements OnInit {
  nomCollegue: string;
  collegueDemande: Collegue;
  collegueTab: Collegue[] = collegueMock;
  listeMats: string[] = [];

  afficher = false;
  afficherMat = false;
  afficheCollegue = false;
  messageErreur: String = null;

  constructor(private _srv: DataService, ) { }

  ngOnInit() {
  }


  rechercherCollegue(saisieValue: string) {
    this.collegueTab = [];
    this._srv.afficherCollegue(saisieValue)
      .subscribe((data: any) => {
        this.collegueTab = data;
        this.afficheCollegue = true;
        // cas ok 

        //Si pas ok
        if (this.collegueTab.length == 0) {
          this.messageErreur = 'Pas de collègue trouvé'
          this.afficheCollegue = false;
        }
      });
  }

  clickC1(matricule: string, nomCollegue: string) {
    let collegueAAfficher: Collegue;
    this.afficheCollegue = true;
    this._srv.listeColleguesService.forEach((collegue) => {
      if (collegue.matricule == matricule) {
        collegueAAfficher = collegue;
        this._srv.publish(collegueAAfficher);
      }
    });

  }
}






