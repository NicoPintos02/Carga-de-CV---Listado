import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Para realizar solicitudes HTTP
import { FormsModule } from '@angular/forms'; // Para usar [(ngModel)]
import { routes } from './app.routes'; // Importa las rutas desde app.routes.ts

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(routes),  // Registra las rutas que importa desde app.routes.ts
    HttpClientModule,  // Importa HttpClientModule para manejar las solicitudes HTTP
    FormsModule        // Importa FormsModule para manejar ngModel
  ],
  providers: []
})
export class AppModule { }
