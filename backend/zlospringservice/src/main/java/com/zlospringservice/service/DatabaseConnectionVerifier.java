package com.zlospringservice.service;

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DatabaseConnectionVerifier {

    @Autowired
    private DataSource dataSource;

    public boolean testConnection() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection != null && !connection.isClosed()) {
                return true;
            }
        } catch (SQLException e) {
            throw new RuntimeException("Falha ao tentar conectar ao banco de dados", e);
        }
        return false;
    }
}