package com.example.documentingester.controller;
import java.util.Arrays;
import org.apache.tika.exception.TikaException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.documentingester.model.Document;
import com.example.documentingester.service.DocumentService;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@CrossOrigin(origins = "http://localhost:4000") // Permitir solicitudes desde el frontend
@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    // API para subir un archivo y obtener el texto extraído y el ID
    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(@RequestParam("file") MultipartFile file) {
        try {
            Document document = documentService.saveDocument(file);
            return ResponseEntity.ok(document);
        } catch (IOException | TikaException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar el archivo.");
        }
    }

    // API para obtener todos los documentos
    @GetMapping
    public List<Document> getAllDocuments() {
        return documentService.getAllDocuments();
    }

    // API para obtener un documento por ID
    @GetMapping("/{id}")
    public Document getDocumentById(@PathVariable Long id) {
        return documentService.getDocumentById(id);
    }

    // Nuevo: API para buscar documentos
   @GetMapping("/search")
public ResponseEntity<?> searchDocuments(@RequestParam("keywords") String keywords,
                                         @RequestParam(value = "threshold", defaultValue = "0") double threshold) {
    List<Document> results;
    if (threshold == 0) {
        // Búsqueda simple por palabras clave. Dividimos las palabras clave en el backend
        results = documentService.searchDocuments(keywords);
    } else {
        // Placeholder para búsqueda con umbral
        List<String> keywordsList = Arrays.asList(keywords.split(","));
        results = documentService.searchDocumentsWithThreshold(keywordsList, threshold);
    }
    return ResponseEntity.ok(results);
}

}
