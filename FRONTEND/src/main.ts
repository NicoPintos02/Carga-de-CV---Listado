import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
    ]),
    importProvidersFrom(HttpClientModule, FormsModule) // Importa HttpClientModule y FormsModule
  ]
}).catch(err => console.error(err));
