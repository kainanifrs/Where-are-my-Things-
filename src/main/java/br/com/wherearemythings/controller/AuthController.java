package br.com.wherearemythings.controller;

import br.com.wherearemythings.dto.LoginRequest;
import br.com.wherearemythings.dto.LoginResponse;
import br.com.wherearemythings.service.UsuarioService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        try {
            boolean loginValido = usuarioService.validarLogin(request.getEmail(), request.getSenha());

            if (!loginValido) {
                LoginResponse resposta = new LoginResponse(false, "E-mail ou senha inválidos!", null, null, null);

                return ResponseEntity.status(401).body(resposta);
            }

            var usuario = usuarioService.buscarPorEmail(request.getEmail());

            LoginResponse resposta = new LoginResponse(true, "Login realizado com sucesso!", usuario.getIdUsuario(), usuario.getNome(), usuario.getTipoUsuario());

            return ResponseEntity.ok(resposta);
        } catch (IllegalStateException e) {
            LoginResponse resposta = new LoginResponse(false, e.getMessage(), null, null, null);

            return ResponseEntity.status(403).body(resposta);
        }
    }
}

