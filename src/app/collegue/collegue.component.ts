import { Component, OnInit, Input } from '@angular/core';
import { Collegue } from '../models/Collegue';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-collegue',
  templateUrl: './collegue.component.html',
  styleUrls: ['./collegue.component.css']
})
export class CollegueComponent implements OnInit {
  edition = false;

  //Création du collègue pour quand on affichera un collègue en particulier
  collegueDemande: Collegue;

  //création du collègue pour le formulaire
  collegue: Collegue = new Collegue();

  //Variables du formulaire 
  saisieMail: string;
  saisieUrl: string;
  saisieMailMobile: string;
  saisieUrlMobile: string;


  //boolean pour savoir si on affiche le premier card ou pas
  premierCard = true;

  @Input() col: Collegue;

  ngOnInit() {
    this._demoSubSrv.prendreAbonnement().subscribe(valeurEmise => {
      this.collegueDemande = valeurEmise;
      this.premierCard = false;
    });
  }

  closeResult: string;

  constructor(private modalService: NgbModal, private _demoSubSrv: DataService) { }

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

  //Fonction pour quand un collègue est demandé
  submitDemande() {
    console.log(this.collegueDemande);
    this._demoSubSrv.patchCollegueMail(this.collegueDemande).subscribe(()=> {}, err => console.log (err.message));
    this._demoSubSrv.patchColleguePhotoUrl(this.collegueDemande).subscribe();
    this.edition = false;
  }


}



