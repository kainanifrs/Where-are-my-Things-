
package br.com.wherearemythings.controller;

import br.com.wherearemythings.dto.LoginRequest;
import br.com.wherearemythings.dto.LoginResponse;
import br.com.wherearemythings.dto.RecuperarSenhaRequest;
import br.com.wherearemythings.dto.RedefinirSenhaRequest;

import br.com.wherearemythings.service.UsuarioService;
import br.com.wherearemythings.service.RecuperacaoSenhaService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UsuarioService usuarioService;
    private final RecuperacaoSenhaService recuperacaoSenhaService;

    @Value("${app.frontend.url:http://localhost:5173}")
    private String urlFrontend;

    public AuthController(UsuarioService usuarioService, RecuperacaoSenhaService recuperacaoSenhaService) {
        this.usuarioService = usuarioService;
        this.recuperacaoSenhaService = recuperacaoSenhaService;
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

    @PostMapping("/recuperar-senha")
    public ResponseEntity<Map<String, String>> recuperarSenha(@RequestBody RecuperarSenhaRequest request) {
        recuperacaoSenhaService.solicitarRecuperacao(request.getEmail(), urlFrontend);

        return ResponseEntity.ok(Map.of("mensagem", "Se o e-mail estiver cadastrado, você receberá um link de recuperação."));
    }

    @PostMapping("/redefinir-senha")
    public ResponseEntity<Map<String, String>> redefinirSenha(@RequestBody RedefinirSenhaRequest request) {

        try {
            recuperacaoSenhaService.redefinirSenha(request.getToken(), request.getNovaSenha());

            return ResponseEntity.ok(Map.of("mensagem", "Senha redefinida com sucesso!"));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("mensagem", e.getMessage()));
        }
    }
}
