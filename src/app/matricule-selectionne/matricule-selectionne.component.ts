import { Component, OnInit, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';
import { Collegue } from '../models/Collegue';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Commentaires } from '../models/Commentaires';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-matricule-selectionne',
  templateUrl: './matricule-selectionne.component.html',
  styleUrls: ['./matricule-selectionne.component.css']
})
export class MatriculeSelectionneComponent implements OnInit {
  edition = false;

  //Création du collègue pour quand on affichera un collègue en particulier
  collegueDemande: Collegue;

  //création du collègue pour le formulaire
  collegue: Collegue = new Collegue();

  //Variables du formulaire 
  saisieMail: string;
  saisieUrl: string;

  //Création de la variable commentaire qui sera chargée dans le formulaire
  commentaire: string;

  //Création du tableau de commentaires et de l'observable
  tabCommentaires: Commentaires[] = new Array();
  commentaires: Observable<Commentaires[]>;
  comOk:boolean = false;


  @Input() col: Collegue;

  closeResult: string;

  constructor(private modalService: NgbModal, private _demoSubSrv: DataService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe((params: ParamMap) => {
      // récupération du paramètre id
      const matricule = params.get('matricule');
      this._demoSubSrv.recupererCollegueParMatricule(matricule).subscribe(col => this.col = col);
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = ` `; //Affiche la phrase si résultat ok. On peut récupérer le result en le mettant dans la phrase
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`; // Affiche la phrase si la personne a quitté
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.edition = false;
      return 'Touche Echap';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.edition = false;
      return 'Touche retour';
    } else {
      this.edition = false;
      return ` `; //mettre ${reason} si vous voulez afficher la raison
    }
  }



  afficherModification() {
    this.edition = true

  }

  //Pour récupérer les informations du form
  //Fonction pour quand aucun collègue n'est demandé, et que celui qui s'affiche est celui de l'initialisation
  submit() {
    console.log(this.col);
    this._demoSubSrv.patchCollegueMail(this.col).subscribe();
    this._demoSubSrv.patchColleguePhotoUrl(this.col).subscribe();
    this.edition = false;
  }

  //Pour récupérer les informations du commentaire
  submitCommentaire() {
    console.log(this.col, this.commentaire);
    this._demoSubSrv.postCommentaire(this.commentaire, this.col).subscribe();
  }

  //Fonction pour quand un collègue est demandé
  submitDemande() {
    console.log(this.collegueDemande);
    this._demoSubSrv.patchCollegueMail(this.collegueDemande).subscribe(() => { }, err => console.log(err.message));
    this._demoSubSrv.patchColleguePhotoUrl(this.collegueDemande).subscribe();
    this.edition = false;
  }

  afficherCommentaires() {
    this.comOk = true;
    this.commentaires = this._demoSubSrv.recupererCommentairesParMatricule(this.col.matricule);
    this.commentaires.subscribe(commentaires => this.tabCommentaires = commentaires, error => console.log(error.message));
  }



}
