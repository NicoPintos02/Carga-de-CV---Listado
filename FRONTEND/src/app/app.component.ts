import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DocumentService } from './services/document.service';
import { CommonModule } from '@angular/common'; // Agregar CommonModule para pipes
import { FormsModule } from '@angular/forms'; // Agregar FormsModule para ngModel

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule] 
})
export class AppComponent implements OnInit {
  searchKeywords: string = '';
  documents: any[] = [];
  selectedDocument: any = null;
  currentDate: Date = new Date(); 

  // Usamos ViewChild para acceder al modal
  @ViewChild('myModal') myModal!: ElementRef;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.listDocuments(); // Cargar documentos al inicio
  }

  // Buscar documentos
  searchDocuments() {
    if (this.searchKeywords.trim()) {
      this.documentService.searchDocuments(this.searchKeywords).subscribe(data => {
        this.documents = data;
      });
    } else {
      this.listDocuments();
    }
  }

  // Listar todos los documentos
  listDocuments() {
    this.documentService.getAllDocuments().subscribe(data => {
      this.documents = data;
    });
  }

  // Subir documentos (abrir explorador de archivos)
  goToUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        this.documentService.uploadDocument(formData).subscribe(() => {
          this.listDocuments(); // Actualizar lista
        });
      }
    };
    input.click(); // Simular clic para abrir el explorador
  }

  // Abrir modal para ver contenido
openModal(document: any) {
  this.selectedDocument = document;

  // Variable temporal para almacenar el texto resaltado
  let highlightedText = this.selectedDocument.extractedText;

  // Resaltam las coincidencias de búsqueda en el contenido del documento si hay palabras clave
  if (this.searchKeywords.trim()) {
    const keywords = this.searchKeywords.trim();
    const regex = new RegExp(`(${keywords})`, 'gi');
    highlightedText = highlightedText.replace(regex, '<span class="highlight">$1</span>');
  }

  // Actualiza el contenido con el texto resaltado
  const modalContent = document.getElementById('modalContent');
  if (modalContent) {
    modalContent.innerHTML = highlightedText;
  }

  // Mostrar el modal si existe
  if (this.myModal) {
    this.myModal.nativeElement.style.display = 'block'; // Mostramos el modal
  }
}

// Cerrar modal
closeModal() {
  if (this.myModal) {
    this.myModal.nativeElement.style.display = 'none'; // Cerramos el modal
  }
}
}
//Conclusion: No funciona el resaltado de las palabras... porque? NO SE AJAJAJA