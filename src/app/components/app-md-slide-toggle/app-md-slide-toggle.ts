import {Component} from '@angular/core'
import {Router, ROUTER_DIRECTIVES} from '@angular/router'
import {MdButton} from '@angular2-material/button/button'
import {MdIcon} from '@angular2-material/icon/icon'
import {MdToolbar} from '@angular2-material/toolbar/toolbar'
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav/sidenav'

const styles = require('./app-md-slide-toggle.scss')
const template = require('./app-md-slide-toggle.html')

@Component({
  moduleId: module.id,
  selector: 'app-md-slide-toggle',
  directives: [MdButton, MdIcon, MdToolbar, MD_SIDENAV_DIRECTIVES, ROUTER_DIRECTIVES],
  template: template,
  styles: [styles],
})
export class AppMdSlideToggle {
  constructor(public router: Router) {}
}
