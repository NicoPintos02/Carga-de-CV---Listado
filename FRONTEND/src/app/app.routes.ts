import { Routes } from '@angular/router';

// Importa los componentes standalone directamente en las rutas
export const routes: Routes = [
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
  { 
    path: 'upload', 
    loadComponent: () => import('./components/upload/upload.component')
      .then(m => m.UploadComponent)
      .catch(error => {
        console.error("Error cargando UploadComponent:", error);
        throw error;  // Lanza el error para que Angular lo gestione
      })
  },
  { 
    path: 'documents', 
    loadComponent: () => import('./components/upload/document-list/document-list.component')
      .then(m => m.DocumentListComponent)
      .catch(error => {
        console.error("Error cargando DocumentListComponent:", error);
        throw error;  // Lanza el error para que Angular lo gestione
      })
  }
];
