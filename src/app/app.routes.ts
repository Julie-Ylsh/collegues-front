import { Routes } from '@angular/router';
import { GalerieComponent } from './galerie/galerie.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MatriculeSelectionneComponent } from './matricule-selectionne/matricule-selectionne.component'
import { ConnexionGuard } from './services/ConnexionGuard';
import { AuthentificationComponent } from './authentification/authentification.component';


export const ROUTES: Routes = [
    { path: 'auth', component: AuthentificationComponent },
    { path: 'galerie', component: GalerieComponent },
    {
        path: '',
        canActivate: [ConnexionGuard],
        children: [
            { path: 'accueil', component: AccueilComponent },
            { path: 'collegue/:matricule', component: MatriculeSelectionneComponent },
            { path: '', pathMatch: 'full', redirectTo: '/accueil' }
        ]
    },


];