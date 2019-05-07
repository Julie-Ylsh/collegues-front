import { Injectable } from '@angular/core';
import { collegueMock } from '../mock/collegues.mock'
import { Collegue } from '../models/Collegue';
import { Subject, Observable } from 'rxjs'
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';

import { error } from '@angular/compiler/src/util';
import { Commentaires } from '../models/Commentaires';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //Liste collègues pour cache
  listeColleguesService: Collegue[] = [];

  //Liste commentaires pour cache
  listeCommentairesService: Commentaires[] = [];
  URL_BACKEND = environment.backendUrl;

  constructor(private _http: HttpClient) {
  }

  recupererCollegueCourant(): Collegue {
    // retourner le collègue fictif à partir du fichier `src/app/mock/collegues.mock.ts`.
    return new Collegue(2, 'Jeltsch', 'Julie', 'julie.bouaye@hotmail.fr', '1994-12-4', 'https://internetjulie.com/wp-content/uploads/2018/10/AdobeStock_84018860.jpeg');
  }


  //Récupérer un collègue en fonction de son nom
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

  //Méthode pour afficher toutes les photos des collègues
  afficherGallerie(): Observable<Collegue[]> {
    //On remet à zéro le tableau sinon à chaque recher il enlèvera pas les recherches précédentes
    this.listeColleguesService = [];

    let url: string = this.URL_BACKEND
    url += "/collegue/photo";
    console.log(url);
    return this._http.get<Collegue[]>(url).pipe(
      map(collegueTab => {
        for (let collegue of collegueTab) {
          this.listeColleguesService.push(collegue);
        }
        console.log('Nombre de collègues : ' + this.listeColleguesService.length);

        return this.listeColleguesService;
      }))

  }

  //Récupérer un collègue d'après son matricule via la méthode prénom
  recupererCollegueDemande(matricule: number, nomCollegue: string): Observable<Collegue> {
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

  //Récupérer un collègue d'après son matricule sans le prénom
  recupererCollegueParMatricule(matricule: string): Observable<Collegue> {
    let url: string = this.URL_BACKEND
    url += "/collegue/photo/found?matricule=";
    url += matricule
    console.log(url);
    return this._http.get<Collegue>(url)
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
    url += '/collegue/photo/';
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

  //Ajout d'un commentaire
  postCommentaire(commentaire: string, collegue: Collegue): Observable<string> {
    let url: string = this.URL_BACKEND;
    url += '/collegue/photo/';
    url += collegue.matricule;
    url += '/commentaire/'
    console.log(url);
    return this._http.post(url, {
      "commentaire": commentaire
    }, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        responseType: 'text'
      });
  }

  //Afficher tous les commentaires d'un collègue
  recupererCommentairesParMatricule(matricule: number): Observable<Commentaires[]> {
    let url: string = this.URL_BACKEND
    url += "/collegue/photo/";
    url += matricule;
    url += "/commentaires/";
    console.log(url);
    return this._http.get<Commentaires[]>(url).pipe(
      map(commentairesTab => {
        for (let commentaire of commentairesTab) {
          this.listeCommentairesService.push(commentaire);
        }
        console.log('Nombre de commentaires : ' + this.listeCommentairesService.length);

        return this.listeCommentairesService;
      }))
  }


  //Vérification auprès du serveur si l'email existe déjà
  checkEmail(email: AbstractControl): Observable<Collegue> {

    let url: string = this.URL_BACKEND
    url += "/collegue/mail?mail=";
    url += email.value
    console.log(url);
    return this._http.get<Collegue[]>(url).pipe(
      map(collegueTab => {
        for (let collegue of collegueTab) {
          if (collegue.email == email.value) {
            console.log('collègue trouvé : ' + collegue.nom + collegue.prenoms)
            return collegue;
          }
          else console.log('pas de collègue trouvé');
        }
      }))

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
