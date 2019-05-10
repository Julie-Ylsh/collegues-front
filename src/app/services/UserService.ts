import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Collegue } from '../models/Collegue';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    //boolean utilisateur connecté
    userConnected: boolean;

    URL_BACKEND = environment.backendUrl;

    constructor(private _http: HttpClient) {
        this.userConnected = false;
        console.log(this.userConnected)
        this.getCollegueCookie().subscribe(() => {
            console.log('cookie ok');
            this.userConnected = true;
          }, err => {
            console.log(err.message);
            this.userConnected = false;
          });   
    }

    ngOnInit(): void {
               

    }
    //Récupérer un collègue avec le cookie
    getCollegueCookie() :Observable<Collegue> {
        let url: string = this.URL_BACKEND
        url += "/me";
       console.log(url);
        return this._http.get<Collegue>(url)
    }

    //Méthode pour se connecter
    postAuthentification(username: string, password: string): Observable<string> {
        let url: string = this.URL_BACKEND;
        url += '/auth';
        return this._http.post(url, {
            "matriculeCollegue": username,
            "motDePasse": password
        }, {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                }),
                responseType: 'text',
                withCredentials: true
            }).pipe(tap(() => this.userConnected = true));
    }


    //Méthode pour se déconnecter
    postLogOut(): Observable<string> {
        let url: string = this.URL_BACKEND;
        url += '/logout';
        return this._http.post(url, {}, {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            }),
            responseType: 'text',
            withCredentials: true
        }).pipe(tap(() => {
            this.userConnected = false; 
            console.log('deconnexion Ok')
        }));
    }

    //Méthode pour savoir si l'utilisateur est connecté
    isLoggedIn() {
        if (this.userConnected == false) return false;
        else return true
    }

   }
