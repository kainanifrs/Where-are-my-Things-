package br.com.wherearemythings.service;

import br.com.wherearemythings.entity.Usuario;
import br.com.wherearemythings.entity.TokenRecuperacaoSenha;
import br.com.wherearemythings.repository.UsuarioRepository;
import br.com.wherearemythings.repository.TokenRecuperacaoSenhaRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.time.LocalDateTime;

@Service
public class RecuperacaoSenhaService {
    private final UsuarioRepository usuarioRepository;
    private final TokenRecuperacaoSenhaRepository tokenRepository;
    private final EmailService emailService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final SecureRandom secureRandom = new SecureRandom();

    public RecuperacaoSenhaService(UsuarioRepository usuarioRepository, TokenRecuperacaoSenhaRepository tokenRepository, EmailService emailService) {
        this.usuarioRepository = usuarioRepository;
        this.tokenRepository = tokenRepository;
        this.emailService = emailService;
    }

    private boolean senhaValida(String senha) {
        return senha != null && senha.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,16}$");
    }

    private String gerarToken() {
        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);

        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String gerarHash(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes());

            return Base64.getEncoder().encodeToString(hash);
        } catch(NoSuchAlgorithmException e) {
            throw new IllegalStateException("Erro ao gerar hash do token.", e);
        }
    }

    public void solicitarRecuperacao(String email, String urlBaseFrontend) {
        Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);

        if (usuario == null || !Boolean.TRUE.equals(usuario.getAtivo())) {
            return;
        }

        String token = gerarToken();

        TokenRecuperacaoSenha registro = new TokenRecuperacaoSenha();

        registro.setUsuario(usuario);
        registro.setTokenHash(gerarHash(token));
        registro.setDataExpiracao(LocalDateTime.now().plusMinutes(30));
        registro.setUtilizado(false);

        tokenRepository.save(registro);

        String link = urlBaseFrontend + "/redefinir-senha?token=" + token;

        emailService.enviarEmailRecuperacao(usuario.getEmail(), link);
    }

    public String verificarToken(String token) {
        if (token == null || token.isBlank()) {
            return "INVALIDO";
        }

        String tokenHash = gerarHash(token);

        TokenRecuperacaoSenha registro = tokenRepository.findByTokenHash(tokenHash).orElse(null);

        if (registro == null) {
            return "INVALIDO";
        }

        if (registro.isUtilizado()) {
            return "UTILIZADO";
        }

        if (!registro.getDataExpiracao().isAfter(LocalDateTime.now())) {
            return "EXPIRADO";
        }

        return "VALIDO";
    }

    public void redefinirSenha(String token, String novaSenha) {
        if (!senhaValida(novaSenha)) {
            throw new IllegalArgumentException("A senha deve ter entre 8 e 16 caracteres, incluindo letra maiúcula, minúscula, número e caractere especial.");
        }

        String tokenHash = gerarHash(token);

        TokenRecuperacaoSenha registro = tokenRepository.findByTokenHash(tokenHash).orElseThrow(() -> new IllegalArgumentException("Link de recuperação inválido."));

        if (registro.isUtilizado() || !registro.getDataExpiracao().isAfter(LocalDateTime.now())) {
            throw new IllegalArgumentException("Link de recuperação expirado ou já utilizado.");
        }

        Usuario usuario = registro.getUsuario();
        usuario.setSenha(passwordEncoder.encode(novaSenha));
        usuarioRepository.save(usuario);
        registro.setUtilizado(true);
        tokenRepository.save(registro);
    }
}
