package com.example.documentingester.service;

import com.example.documentingester.model.Document;
import com.example.documentingester.repository.DocumentRepository;
import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final Tika tika;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
        this.tika = new Tika();
    }

    // Método para guardar el documento y extraer el texto
    public Document saveDocument(MultipartFile file) throws IOException, TikaException {
        String extractedText = extractTextFromFile(file);
        Document document = new Document();
        document.setFileName(file.getOriginalFilename());
        document.setExtractedText(extractedText);
        return documentRepository.save(document);
    }

    // Método para extraer el texto usando Apache Tika
    private String extractTextFromFile(MultipartFile file) throws IOException, TikaException {
        return tika.parseToString(file.getInputStream());
    }

    // Método para obtener todos los documentos
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    // Método para obtener un documento por ID
    public Document getDocumentById(Long id) {
        return documentRepository.findById(id).orElse(null);
    }

    // Método para búsqueda simple por palabras clave
    public List<Document> searchDocuments(String keyword) {
        return documentRepository.findByExtractedTextContainingIgnoreCase(keyword);
    }

    // Método para búsqueda con umbral (placeholder)
    public List<Document> searchDocumentsWithThreshold(List<String> keywords, double threshold) {
        // Placeholder: implementación futura de búsqueda inteligente
        String joinedKeywords = String.join(" ", keywords);
        return searchDocuments(joinedKeywords);
    }
}
