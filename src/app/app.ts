import {Component} from '@angular/core'
import {Router, ROUTER_DIRECTIVES} from '@angular/router'
import {MdButton} from '@angular2-material/button/button'
import {MdIcon} from '@angular2-material/icon/icon'
import {MdToolbar} from '@angular2-material/toolbar/toolbar'
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav/sidenav'

@Component({
  selector: 'app',
  providers: [],
  pipes: [],
  directives: [MdButton, MdIcon, MdToolbar, MD_SIDENAV_DIRECTIVES, ROUTER_DIRECTIVES],
  templateUrl: 'app/app.html',
  styles: [require('./app.scss')],
})
export class App {
  componentsOpened: boolean = false
  toggled: any
  transition: any
  height: any

  constructor(public router: Router) {}

  toggleComponents() {
    this.componentsOpened = !this.componentsOpened
    this.toggled = this.componentsOpened ? 'toggled' : ''
    this.height = this.componentsOpened ? '900px' : '0'
    this.transition = this.componentsOpened ? 'max-height 0.25s ease-in' : ''
    return this.componentsOpened
  }
}
