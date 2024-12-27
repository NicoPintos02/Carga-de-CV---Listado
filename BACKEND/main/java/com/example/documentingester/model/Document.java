package com.example.documentingester.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Lob;
import jakarta.persistence.Column;

@Entity //esto indica que es una entidad JPA//
public class Document {

    // Id y GeneratedValue se usan como identificador único auto-incremental
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nombre del archivo
    private String fileName;

    // Extensión del archivo
    private String fileExtension;

    // Lob y extractedText permite almacenar textos largos
    @Column(columnDefinition = "TEXT")
    private String extractedText;

    // Constructor vacío
    public Document() {}

    // Constructor con parámetros
    public Document(String fileName, String fileExtension, String extractedText) {
        this.fileName = fileName;
        this.fileExtension = fileExtension;
        this.extractedText = extractedText;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileExtension() {
        return fileExtension;
    }

    public void setFileExtension(String fileExtension) {
        this.fileExtension = fileExtension;
    }

    public String getExtractedText() {
        return extractedText;
    }

    public void setExtractedText(String extractedText) {
        this.extractedText = extractedText;
    }
}
