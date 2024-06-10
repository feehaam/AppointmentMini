package com.healthcare.backend.controller;

import com.healthcare.backend.exception.LocalFileHandlingException;
import com.healthcare.backend.service.LocalFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin("*")
@RequestMapping("/files")
@RequiredArgsConstructor
public class LocalFileServiceController {

    private final LocalFileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) throws LocalFileHandlingException {
        String response = fileService.upload(file);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/download")
    public ResponseEntity<byte[]> download(@RequestParam("filePath") String filePath) throws IOException {
        File file = new File(filePath);
        Path path = Paths.get(filePath);
        byte[] fileContent = Files.readAllBytes(path);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=" + file.getName())
                .body(fileContent);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam String url) throws LocalFileHandlingException {
        fileService.delete(url);
        return ResponseEntity.ok("File deleted successfully.");
    }
}
