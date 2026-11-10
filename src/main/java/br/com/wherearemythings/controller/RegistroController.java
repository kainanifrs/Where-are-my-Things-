package br.com.wherearemythings.controller;

import br.com.wherearemythings.entity.Registro;
import br.com.wherearemythings.service.RegistroService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registros")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistroController {
    private final RegistroService registroService;

    public RegistroController(RegistroService registroService) {
        this.registroService = registroService;
    }

    @GetMapping
    public List<Registro> listar() {
        return registroService.listarTodos();
    }

    @GetMapping("/{id}")
    public Registro buscarPorId(@PathVariable Long id) {
        return registroService.buscarPorId(id);
    }

    @PostMapping
    public Registro salvar(@RequestBody Registro registro) {
        return registroService.salvar(registro);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Long id) {
        registroService.excluir(id);
    }
}
