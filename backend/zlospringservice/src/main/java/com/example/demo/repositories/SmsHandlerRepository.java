package com.example.demo.repositories;

import com.example.demo.model.SmsHandler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface SmsHandlerRepository extends JpaRepository<SmsHandler, Integer> {

    @Transactional
    long deleteByCpfDep(String cpfDep);
}
