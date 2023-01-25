import { Component } from '@angular/core';

import { ConversorService } from './../../services/conversor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent {

  constructor(private router?: Router) { };


  submitForm(): void {
    return console.log('preto');
  };

};
