package com.zlospringservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ConnectionTest implements CommandLineRunner {

    @Autowired
    private DatabaseConnectionVerifier dbVerifier;

//    public static void main(String[] args) {
//        SpringApplication.run(ConnectionTest.class, args);
//    }

    @Override
    public void run(String... args) throws Exception {
        if (dbVerifier.testConnection()) {
            System.out.println("Conexão com o banco de dados está OK!");
        } else {
            System.out.println("Não foi possível conectar ao banco de dados.");
        }
    }
}
