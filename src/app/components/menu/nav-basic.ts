import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-nav-basic',
  standalone: true,
  imports: [ NgbNavModule ],
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.css' ]
})
export class NgbdNavBasic {
  active = "HOME";
}
