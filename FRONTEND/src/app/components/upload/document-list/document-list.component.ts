import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Para usar el pipe slice
import { FormsModule } from '@angular/forms';    // Para usar ngModel
import { DocumentService } from '../../../services/document.service';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, FormsModule],  
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: any[] = [];
  keyword: string = '';

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.getAllDocuments();
  }

  getAllDocuments() {
    this.documentService.getAllDocuments().subscribe(
      data => {
        this.documents = data;
      },
      error => {
        console.error('Error al obtener los documentos', error);
      }
    );
  }

  searchDocuments() {
    if (this.keyword.trim()) {
      this.documentService.searchDocuments(this.keyword).subscribe(
        data => {
          this.documents = data;
        },
        error => {
          console.error('Error al buscar documentos', error);
        }
      );
    } else {
      this.getAllDocuments();
    }
  }
}
