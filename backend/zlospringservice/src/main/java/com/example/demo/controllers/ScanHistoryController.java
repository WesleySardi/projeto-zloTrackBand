package com.example.demo.controllers;

import com.example.demo.model.ScanHistory;
import com.example.demo.repositories.ScanHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/scanHistory")
public class ScanHistoryController {

    @Autowired
    private ScanHistoryRepository scanHistoryRepository;

    @PostMapping
    public ResponseEntity<ScanHistory> createScanHistory(@RequestBody ScanHistory scanHistory) {
        scanHistory.setScanDateTime(ZonedDateTime.now(ZoneId.of("America/Sao_Paulo")).toOffsetDateTime());

        ScanHistory savedScanHistory = scanHistoryRepository.save(scanHistory);
        return new ResponseEntity<>(savedScanHistory, HttpStatus.CREATED);
    }
}
