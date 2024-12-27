import { Component } from '@angular/core'; 
import { DocumentService } from '../../services/document.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  // Variable para almacenar el archivo seleccionado
  selectedFile: File | null = null;

  // Variables para mensajes
  message: string = '';
  isSuccess: boolean = false;

  // Inyecta el servicio de documentos
  constructor(private documentService: DocumentService) { }

  // Método que se ejecuta cuando se selecciona un archivo
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Método para subir el archivo al backend
  onUpload() {
    if (this.selectedFile) {
      // Crea el FormData y le añado el archivo
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.documentService.uploadDocument(formData).subscribe(
        response => {
          console.log('Documento subido exitosamente', response);
          this.message = 'Documento subido exitosamente';
          this.isSuccess = true;
          // Limpia el archivo seleccionado
          this.selectedFile = null;
        },
        error => {
          console.error('Error al subir el documento', error);
          this.message = 'Error al subir el documento';
          this.isSuccess = false;
        }
      );
    } else {
      this.message = 'Por favor, selecciona un archivo primero.';
      this.isSuccess = false;
    }
  }
}
