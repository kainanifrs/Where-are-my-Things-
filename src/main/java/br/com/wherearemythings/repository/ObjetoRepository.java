package br.com.wherearemythings.repository;

import br.com.wherearemythings.entity.Objeto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ObjetoRepository extends  JpaRepository<Objeto, Long> {

}
