import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';
import { NgbDatepickerConfig, NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Collegue } from '../models/Collegue';

@Component({
  selector: 'app-creer-collegue',
  templateUrl: './creer-collegue.component.html',
  styleUrls: ['./creer-collegue.component.css'],
  providers: [NgbDatepickerConfig]
})
export class CreerCollegueComponent implements OnInit {
  afficherCreation: boolean = false;

  //Variable pour afficher ok si collegue créé
  creationOK: boolean = false;

  closeResult: string;

  //Création d'un collègue vide pour mettre dans le formulaire
  collegueACreer: Collegue = new Collegue();

  //Récupérer la date de naissance du calendrier
  dateCollegue: NgbDateStruct;
  get dateAfficherModal() {
    return new Date(this.dateCollegue.year, this.dateCollegue.month, this.dateCollegue.day);
  }

  constructor(private _demoSubSrv: DataService, private modalService: NgbModal, config: NgbDatepickerConfig, calendar: NgbCalendar) {
    // customize default values of datepickers used by this component tree
    config.minDate = { year: 1920, month: 1, day: 1 };
    config.maxDate = { year: 2019, month: 12, day: 31 };
  }

  ngOnInit() {
  }

  submit(modal?: NgbActiveModal) {
    //Récupérer la date de naissance au bon format
    let jourNaissance: string;
    let moisNaissance: string;
    if (this.dateCollegue.day < 10) {
      jourNaissance = `0${this.dateCollegue.day}`
    }
    else {
      jourNaissance = `${this.dateCollegue.day}`
    }

    if (this.dateCollegue.month < 10) {
      moisNaissance = `0${this.dateCollegue.month}`
    }
    else {
      moisNaissance = `${this.dateCollegue.month}`
    }
    this.collegueACreer.dateDeNaissance = `${this.dateCollegue.year}-${moisNaissance}-${jourNaissance}`

    console.log(this.collegueACreer);

    this._demoSubSrv.postCollegue(this.collegueACreer).subscribe(() => {
      modal.close('Save click');
    }, err => {
      console.log(err.message);
      return alert(`Vous n'avez pas entré les bons paramètres ! \n
      Rappel : \n
      -Age supérieur à 18 ans\n
      -Adresse mail valide\n
      -Photo commençant par http://`)
    });

  }

  //Fonctions pour la modal
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = ` `; //Affiche la phrase si résultat ok. On peut récupérer le result en le mettant dans la phrase
      this.afficherCreation = false;
      this.creationOK = true;
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`; // Affiche la phrase si la personne a quitté
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.afficherCreation = true;
      return 'Touche Echap';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.afficherCreation = false;
      return 'Touche retour';
    } else {
      this.afficherCreation = true;
      return ` `; //mettre ${reason} si vous voulez afficher la raison
    }
  }
}
