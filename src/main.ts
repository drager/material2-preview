import {enableProdMode} from '@angular/core'
import {bootstrap} from '@angular/platform-browser-dynamic'
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser'
import {HTTP_PROVIDERS} from '@angular/http'
import {provide} from '@angular/core'
import {Renderer} from '@angular/core'
import {APP_BASE_HREF} from '@angular/common'
import {disableDeprecatedForms, provideForms} from '@angular/forms'
import {LocationStrategy, HashLocationStrategy} from '@angular/common'
import {OVERLAY_CONTAINER_TOKEN} from '@angular2-material/core/overlay/overlay'
import {createOverlayContainer} from '@angular2-material/core/overlay/overlay-container'
import {MdGestureConfig} from '@angular2-material/core/gestures/MdGestureConfig'
import {MdIconRegistry} from '@angular2-material/icon/icon-registry'

import {App} from './app/app'
import {APP_ROUTE_PROVIDER} from './app/routes'

const production = process.env.NODE_ENV === 'production'

if (!production) {
  enableProdMode()
}

bootstrap(App, [
  disableDeprecatedForms(),
  provideForms(),
  APP_ROUTE_PROVIDER,
  provide(OVERLAY_CONTAINER_TOKEN, {useValue: createOverlayContainer()}),
  HTTP_PROVIDERS,
  MdIconRegistry,
  Renderer,
  provide(HAMMER_GESTURE_CONFIG, {useClass: MdGestureConfig}),
  provide(APP_BASE_HREF, {
    useValue: production
                ? 'https://drager.github.io/material2-preview/'
                : '/',
  }),
  {provide: LocationStrategy, useClass: HashLocationStrategy},
]).catch(err => console.error(err))
