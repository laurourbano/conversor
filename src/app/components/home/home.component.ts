import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ConversorService } from './../../services/conversor.service';
import { Conversao } from 'src/app/interfaces/conversao';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  conversao = {} as Conversao
  conversoes!: Conversao[];

  constructor(private conversorService: ConversorService, private router: Router) { };

  ngOnInit(): void {
  }

  submitForm(): void {
    return console.log();
  };

};


