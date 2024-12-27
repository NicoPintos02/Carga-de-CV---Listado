

import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config.server';

if (environment.production) {
  enableProdMode();
}

// Exporta una función de arranque para Angular Universal
export default function(): Promise<any> {
  return bootstrapApplication(AppComponent, appConfig);
}
