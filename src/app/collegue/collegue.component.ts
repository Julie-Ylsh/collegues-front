import { Component, OnInit, Input } from '@angular/core';
import { Collegue } from '../models/Collegue';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';



@Component({
  selector: 'app-collegue',
  templateUrl: './collegue.component.html',
  styleUrls: ['./collegue.component.css']
})
export class CollegueComponent implements OnInit {
  edition = false;
  collegueDemande: Collegue;

//boolean pour savoir si on affiche le premier card ou pas
  premierCard = true;
    
  @Input() col: Collegue;

  ngOnInit() {
    this.demoSubSrv.prendreAbonnement().subscribe(valeurEmise => {
      this.collegueDemande = valeurEmise;
      this.premierCard = false;
    });
  }

  closeResult: string;

  constructor(private modalService: NgbModal, private demoSubSrv: DataService) { }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Collegue ajouté`; //Affiche la phrase si résultat ok. On peut récupérer le result en le mettant dans la phrase
    }, (reason) => {
      this.closeResult = `Annulé ${this.getDismissReason(reason)}`; // Affiche la phrase si la personne a quitté
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'Touche Echap';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'Touche retour';
    } else {
      return ` `; //mettre ${reason} si vous voulez afficher la raison
    }
  }

  

  afficherModification() {
    this.edition = true

  }

  
}



