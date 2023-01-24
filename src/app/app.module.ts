import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BrowserModule } from '@angular/platform-browser';
import { HistoricoComponent } from './components/pagina/historico/historico.component';
import { MenuComponent } from './components/pagina/menu/menu.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/pagina/footer/footer.component';
import { HomeComponent } from './components/pagina/home/home.component';
import { PaginaComponent } from './components/pagina/pagina.component';
import { PaginatorComponent } from './components/pagina/home/paginator/paginator.component';
@NgModule({
  declarations: [
    AppComponent,
    PaginaComponent,
    FooterComponent,
    HistoricoComponent,
    MenuComponent,
    HomeComponent,
    PaginatorComponent,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatMenuModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
  ],
  exports: [
    HomeComponent,
    FooterComponent,
    PaginatorComponent
  ]
})
export class AppModule { }
