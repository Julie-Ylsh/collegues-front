import { Injectable } from '@angular/core';
import { collegueMock } from '../mock/collegues.mock'
import { Collegue } from '../models/Collegue';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  listeMats: string[] = [];
  nomCollegue: string;
  messageErreur:String = null;
  afficher = false;
  constructor() { }

  rechercherParNom(nom: string): string[] {
    // retourner une liste de matricules fictifs à partir du fichier `src/app/mock/matricules.mock.ts`.
    this.nomCollegue = nom;

    for (let col of collegueMock) {
      if (col.nom == nom) {
        this.listeMats.push(col.matricule);
        this.afficher = true;
      }
    }
    if (this.listeMats.length == 0) {
      this.messageErreur = 'Pas de collègue trouvé'
    }

    return this.listeMats;
  }

    recupererCollegueCourant(): Collegue {
      // retourner le collègue fictif à partir du fichier `src/app/mock/collegues.mock.ts`.
      return new Collegue ('A32', 'Jeltsch', 'Julie', 'julie.bouaye@hotmail.fr', '1994-12-4', 'urlphoto');
    }
  }
