package br.com.wherearemythings.service;

import br.com.wherearemythings.entity.Categoria;
import br.com.wherearemythings.repository.CategoriaRepository;
import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }

    public List<Categoria> listarAtivas() {
        return categoriaRepository.findByAtivaTrueOrderByNomeAsc();
    }

    public Categoria cadastrar(String nome) {
        validarNome(nome);

        nome = nome.trim();

        if (categoriaRepository.findByNomeIgnoreCase(nome).isPresent()) {
            throw new IllegalArgumentException("Já existe uma categoria com esse nome.");
        }

        Categoria categoria = new Categoria();
        categoria.setNome(nome);

        return categoriaRepository.save(categoria);
    }

    public Categoria editar(Long id, String novoNome) {
        validarNome(novoNome);

        novoNome = novoNome.trim();

        Categoria categoria = categoriaRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada."));

        categoriaRepository.findByNomeIgnoreCase(novoNome).ifPresent(existence -> {
            if (!existence.getIdCategoria().equals(id)) {
                throw new IllegalArgumentException("Já existe uma categoria com esse nome.");
            }
        });

        categoria.setNome(novoNome);

        return categoriaRepository.save(categoria);
    }

    public void desativar(Long id) {
        Categoria categoria = categoriaRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada."));

        categoria.setAtiva(false);
        categoriaRepository.save(categoria);
    }

    private void validarNome(String nome) {
        if (nome == null || nome.trim().isEmpty()) {
            throw new IllegalArgumentException("O nome da categoria é obrigatório.");
        }

        if (nome.trim().length() > 50) {
            throw new IllegalArgumentException("O nome da categoria deve ter no máximo 50 caracteres.");
        }
    }
}
