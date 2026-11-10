package br.com.wherearemythings.repository;

import br.com.wherearemythings.entity.Registro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistroRepository extends JpaRepository<Registro,Long> {

}
