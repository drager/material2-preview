import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router'

@Component({
  selector: 'app',
  providers: [],
  pipes: [],
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'app/app.html',
  styles: [require('./app.scss')],
})
export class App {
  constructor() {}
}
