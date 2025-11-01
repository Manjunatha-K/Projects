package com.claim.UploadAPI.services;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.azure.storage.blob.models.BlobHttpHeaders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.Instant;
import java.util.UUID;

@Service
public class UploadService {

    private final BlobServiceClient blobServiceClient;
    private final String containerName;

    public UploadService(
            @Value("${spring.cloud.azure.storage.container-name}") String containerName,
            @Value("${spring.cloud.azure.storage.connection-string}") String connectionString) {
        this.blobServiceClient = new BlobServiceClientBuilder()
                .connectionString(connectionString)
                .buildClient();
        this.containerName = containerName;
    }

    public String uploadFile(String claimId, MultipartFile file) throws Exception {
        if (file.isEmpty()) throw new IllegalArgumentException("Empty file");

        // Validate type
        if (!"application/pdf".equalsIgnoreCase(file.getContentType())) {
            throw new IllegalArgumentException("Only PDF files allowed");
        }

        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
        if (!containerClient.exists()) containerClient.create();



        // Create unique blob name
        String blobName = "claims/" + claimId + "_" + file.getOriginalFilename();
        BlobClient blobClient = containerClient.getBlobClient(blobName);

        // Upload the file
        try (InputStream inputStream = file.getInputStream()) {
            blobClient.upload(inputStream, file.getSize(), true);
        }

        // Set metadata and headers
        blobClient.setHttpHeaders(new BlobHttpHeaders().setContentType("application/pdf"));

        // Return public URL (or private URL if you use SAS)
        return blobClient.getBlobUrl();
    }
}
