import {provideRouter, RouterConfig} from '@angular/router'

import {Home} from './components/home/home'
import {AppMdButton} from './components/app-md-button/app-md-button'
import {AppMdCard} from './components/app-md-card/app-md-card'
import {AppMdCheckbox} from './components/app-md-checkbox/app-md-checkbox'
import {AppMdGridList} from './components/app-md-grid-list/app-md-grid-list'
import {AppMdIcon} from './components/app-md-icon/app-md-icon'
import {AppMdInput} from './components/app-md-input/app-md-input'
import {AppMdList} from './components/app-md-list/app-md-list'
import {AppMdProgressBar} from './components/app-md-progress-bar/app-md-progress-bar'
import {AppMdProgressCircle} from './components/app-md-progress-circle/app-md-progress-circle'
import {AppMdRadio} from './components/app-md-radio/app-md-radio'
import {AppMdSidenav} from './components/app-md-sidenav/app-md-sidenav'
import {AppMdSlideToggle} from './components/app-md-slide-toggle/app-md-slide-toggle'
import {AppMdTabs} from './components/app-md-tabs/app-md-tabs'
import {AppMdToolbar} from './components/app-md-toolbar/app-md-toolbar'

export const routes: RouterConfig = [
  {path: '', component: Home},
  {path: 'md-button', component: AppMdButton},
  {path: 'md-card', component: AppMdCard},
  {path: 'md-checkbox', component: AppMdCheckbox},
  {path: 'md-grid-list', component: AppMdGridList},
  {path: 'md-icon', component: AppMdIcon},
  {path: 'md-input', component: AppMdInput},
  {path: 'md-list', component: AppMdList},
  {path: 'md-progress-bar', component: AppMdProgressBar},
  {path: 'md-progress-circle', component: AppMdProgressCircle},
  {path: 'md-radio', component: AppMdRadio},
  {path: 'md-sidenav', component: AppMdSidenav},
  {path: 'md-slide-toggle', component: AppMdSlideToggle},
  {path: 'md-tabs', component: AppMdTabs},
  {path: 'md-toolbar', component: AppMdToolbar},
]

export const APP_ROUTE_PROVIDER = [provideRouter(routes)]
