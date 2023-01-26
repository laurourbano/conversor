import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoComponent } from './components/historico/historico.component';
import { HomeComponent } from './components/home/home.component';
import { ListaComponent } from './components/lista/lista.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: 'lista', component: ListaComponent },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
