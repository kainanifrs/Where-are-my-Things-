
package br.com.wherearemythings.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseInitializer {

    private static final String DATABASE_NAME = "where_are_my_things";

    public static void initialize() {
        String url = "jdbc:postgresql://localhost:5432/postgres";
        String username = "postgres";
        String password = System.getenv("DB_PASSWORD");

        if (password == null || password.isBlank()) {
            throw new IllegalStateException(
                    "A variável de ambiente DB_PASSWORD não foi configurada."
            );
        }

        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            String sql = "SELECT EXISTS (" + "SELECT 1 FROM pg_database WHERE datname = ?" + ")";

            boolean databaseExists;

            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, DATABASE_NAME);

                try (ResultSet result = statement.executeQuery()) {
                    result.next();
                    databaseExists = result.getBoolean(1);
                }
            }

            if (!databaseExists) {
                try (Statement statement = connection.createStatement()) {
                    statement.execute("CREATE DATABASE " + DATABASE_NAME);
                }

                System.out.println("Banco de dados criado com sucesso!");
            }

            else {
                System.out.println("Banco de dados já existe.");
            }

        }

        catch (SQLException e) {
            throw new IllegalStateException("Não foi possível verificar ou criar o banco de dados.", e);
        }
    }
}
