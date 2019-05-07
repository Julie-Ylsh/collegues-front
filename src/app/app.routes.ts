import { Routes } from '@angular/router';
import { GalerieComponent } from './galerie/galerie.component';
import { AccueilComponent } from './accueil/accueil.component';
import {MatriculeSelectionneComponent} from './matricule-selectionne/matricule-selectionne.component'


export const ROUTES: Routes = [
    { path: 'accueil', component: AccueilComponent },
    { path: 'galerie', component: GalerieComponent },
    { path: 'collegue/:matricule', component: MatriculeSelectionneComponent},

    { path: '', pathMatch: 'full', redirectTo: '/accueil' }
];