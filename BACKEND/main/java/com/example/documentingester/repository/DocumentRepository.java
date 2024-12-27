package com.example.documentingester.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.documentingester.model.Document;
import java.util.List;

//JpaRepository proporciona metodos CRUD - Crear, Leer, Actualizar y Borrar
public interface DocumentRepository extends JpaRepository<Document, Long> {
    // Método para buscar documentos por palabras clave en el texto extraído
    List<Document> findByExtractedTextContainingIgnoreCase(String keyword);
}
