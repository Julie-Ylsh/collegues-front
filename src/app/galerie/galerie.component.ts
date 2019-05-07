import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Collegue } from '../models/Collegue';

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.css']
})

export class GalerieComponent implements OnInit {
  tabCollegues:Collegue[] = new Array ();
  collegues :Observable<Collegue[]>;

  constructor(private _service:DataService, private _router:Router) { }

  ngOnInit() {
    this.collegues = this._service.afficherGallerie ();
    this.collegues.subscribe (collegues => this.tabCollegues = collegues,
                              error => console.log (error.message));
  }
}