package br.com.wherearemythings.service;

import br.com.wherearemythings.entity.Usuario;
import br.com.wherearemythings.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncode) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    private boolean senhaValida(String senha) {
        return senha != null && senha.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,16}$");
    }

    public Usuario salvar(Usuario usuario) {
       if (usuario.getIdUsuario() == null) {
           if (!senhaValida(usuario.getSenha())) {
               throw new IllegalArgumentException("A senha deve ter entre 8 e 16 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.");
           }

           usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
       }

       return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email).orElse(null);
    }

    public boolean validarLogin(String email, String senha) {
        Usuario usuario = buscarPorEmail(email);

        if (usuario == null || !Boolean.TRUE.equals(usuario.getAtivo())) {
            throw new IllegalStateException("Usuário inativo");
        }

        return passwordEncoder.matches(senha, usuario.getSenha());
    }

    public void excluir(long id) {
        usuarioRepository.deleteById(id);
    }
}