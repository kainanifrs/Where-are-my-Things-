package br.com.wherearemythings.service;

import br.com.wherearemythings.entity.Objeto;
import br.com.wherearemythings.repository.ObjetoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class ObjetoService {
    private final ObjetoRepository objetoRepository;

    public ObjetoService(ObjetoRepository objetorepository) {
        this.objetoRepository = objetorepository;
    }

    public Objeto salvar(Objeto objeto) {
        return objetoRepository.save(objeto);
    }

    public List<Objeto> listarTodos() {
        return objetoRepository.findAll();
    }

    public Objeto buscarPorId(Long id) {
        return objetoRepository.findById(id).orElse(null);
    }

    public void excluir(Long id) {
        objetoRepository.deleteById(id);
    }
}
