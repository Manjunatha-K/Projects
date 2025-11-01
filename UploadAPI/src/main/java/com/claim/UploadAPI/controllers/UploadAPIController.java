package com.claim.UploadAPI.controllers;

import com.claim.UploadAPI.services.UploadService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/claims")
public class UploadAPIController {


    private final UploadService uploadService;

    public UploadAPIController(UploadService uploadService) {
        this.uploadService = uploadService;
    }

    @GetMapping("/helo")
    public String getHello() {
        return "HELLLLLOOOOO";
    }

    @PostMapping("/{claimId}/upload")
    public ResponseEntity<?> uploadBill(
            @PathVariable String claimId,
            @RequestParam("file") MultipartFile file) {
        try {
            String blobUrl = uploadService.uploadFile(claimId, file);
            return ResponseEntity.ok().body("{\"blobUrl\":\"" + blobUrl + "\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
}
