package com.example.demo.repositories;

import com.example.demo.model.ScanHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
    public interface ScanHistoryRepository extends JpaRepository<ScanHistory, Long> {
}