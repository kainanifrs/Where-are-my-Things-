package br.com.wherearemythings.service;

import br.com.wherearemythings.entity.Registro;
import br.com.wherearemythings.repository.RegistroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistroService {
    private final RegistroRepository registroRepository;

    public RegistroService(RegistroRepository registroRepository) {
        this.registroRepository = registroRepository;
    }

    public Registro salvar(Registro registro) {
        return registroRepository.save(registro);
    }

    public List<Registro> listarTodos() {
        return registroRepository.findAll();
    }

    public  Registro buscarPorId(Long id) {
        return registroRepository.findById(id).orElse(null);
    }

    public void excluir(Long id) {
        registroRepository.deleteById(id);
    }
}
