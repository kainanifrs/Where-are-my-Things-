package br.com.wherearemythings.repository;

import br.com.wherearemythings.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Optional<Categoria> findByNomeIgnoreCase(String nome);

    List<Categoria> findByAtivaTrueOrderByNomeAsc();
}