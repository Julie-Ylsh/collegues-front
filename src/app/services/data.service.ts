import { Injectable } from '@angular/core';
import { collegueMock } from '../mock/collegues.mock'
import { Collegue } from '../models/Collegue';
import { Subject, Observable } from 'rxjs'
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //Liste collègues pour cache
  listeColleguesService: Collegue[] = [];
  URL_BACKEND = environment.backendUrl;

  constructor(private _http: HttpClient) {
  }

  recupererCollegueCourant(): Collegue {
    // retourner le collègue fictif à partir du fichier `src/app/mock/collegues.mock.ts`.
    return new Collegue('2', 'Jeltsch', 'Julie', 'julie.bouaye@hotmail.fr', '1994-12-4', 'https://internetjulie.com/wp-content/uploads/2018/10/AdobeStock_84018860.jpeg');
  }

  afficherCollegue(nomCollegue: string): Observable<Collegue[]> {
    //On remet à zéro le tableau sinon à chaque recher il enlèvera pas les recherches précédentes
    this.listeColleguesService = [];

    let url: string = this.URL_BACKEND
    url += "/collegue?nomClient=";
    url += nomCollegue
    console.log(url);
    return this._http.get<Collegue[]>(url).pipe(
      map(collegueTab => {
        for (let collegue of collegueTab) {
          if (collegue.nom == nomCollegue) {
            this.listeColleguesService.push(collegue);
          }
        }
        console.log('Nombre de collègues : ' + this.listeColleguesService.length);

        return this.listeColleguesService;
      }))

  }

  //Au cas où on a besoin de récupérer un collègue d'apèrs son matricule
  recupererCollegueDemande(matricule: string, nomCollegue: string): Observable<Collegue> {
    let collegueDemande: Collegue;
    let url: string = this.URL_BACKEND
    url += "/collegue?nomClient=";
    url += nomCollegue
    console.log(url);
    return this._http.get<Collegue[]>(url).pipe(
      map(collegueTab => {
        for (let collegue of collegueTab) {
          if (collegue.matricule == matricule) {
            collegueDemande = collegue;
          }
        }
        return collegueDemande;
      }))

  }

  // Options de la requête HTTP
  // ici le corps de la requête sera du JSON
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  patchCollegueMail(collegue: Collegue): Observable<string> {
    let url: string = this.URL_BACKEND;
    url += '/collegue/';
    url += collegue.matricule;
    console.log(url);
    return this._http.patch(url, {
      "email": collegue.email
    }, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        responseType: 'text'
      });
  }

  patchColleguePhotoUrl(collegue: Collegue): Observable<string> {
    let url: string = this.URL_BACKEND;
    url += '/collegue/modifphoto/';
    url += collegue.matricule;
    console.log(collegue.photoUrl);

    return this._http.patch(url, {
      "photoUrl": collegue.photoUrl
    }, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        responseType: 'text'
      });
  }

  postCollegue(collegue: Collegue): Observable<string> {
    let url: string = this.URL_BACKEND;
    url += '/collegue/';
    
    return this._http.post(url, {
      "nom": collegue.nom,
      "prenoms": collegue.prenoms,
      "dateDeNaissance": collegue.dateDeNaissance,
      "email": collegue.email,
      "photoUrl": collegue.photoUrl
    }, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      responseType: 'text'
    });
  }

  //Code pour associer ma recherche de collègue au composant collegue
  private subject = new Subject<Collegue>();
  publish(data: Collegue) {
    // publier dans le subject
    this.subject.next(data);
  }
  prendreAbonnement(): Observable<Collegue> {
    return this.subject.asObservable();
  }
}
