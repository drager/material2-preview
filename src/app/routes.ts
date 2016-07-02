import {provideRouter, RouterConfig} from '@angular/router'

import {Home} from './components/home/home'

export const routes: RouterConfig = [
  {path: '', component: Home},
]

export const APP_ROUTE_PROVIDER = [provideRouter(routes)]
