package br.com.wherearemythings.controller;

import br.com.wherearemythings.entity.Objeto;
import br.com.wherearemythings.service.ObjetoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/objetos")
@CrossOrigin(origins = "http://localhost:5173")
public class ObjetoController {
    private final ObjetoService objetoService;

    public ObjetoController(ObjetoService objetoService) {
        this.objetoService = objetoService;
    }

    @GetMapping
    public List<Objeto> listar() {
        return objetoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Objeto buscarPorId(@PathVariable Long id) {
        return objetoService.buscarPorId(id);
    }

    @PostMapping
    public Objeto salvar(@RequestBody Objeto objeto) {
        return objetoService.salvar(objeto);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        objetoService.excluir(id);
    }
}