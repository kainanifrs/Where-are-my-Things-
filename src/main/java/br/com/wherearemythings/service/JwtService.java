
package br.com.wherearemythings.service;

import br.com.wherearemythings.entity.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String segredo;

    public String gerarToken(Usuario usuario) {

        try {
            SecretKey chave = new SecretKeySpec(
                    segredo.getBytes(StandardCharsets.UTF_8),
                    "HmacSHA256"
            );

            Instant agora = Instant.now();

            JWTClaimsSet claims = new JWTClaimsSet.Builder()
                    .subject(usuario.getEmail())
                    .claim("idUsuario", usuario.getIdUsuario())
                    .claim("nome", usuario.getNome())
                    .claim("tipoUsuario", usuario.getTipoUsuario())
                    .issueTime(Date.from(agora))
                    .expirationTime(Date.from(agora.plus(2, ChronoUnit.HOURS)))
                    .build();

            SignedJWT jwt = new SignedJWT(
                    new JWSHeader(JWSAlgorithm.HS256),
                    claims
            );

            jwt.sign(new MACSigner(chave.getEncoded()));

            return jwt.serialize();

        } catch (JOSEException e) {
            throw new IllegalStateException("Erro ao gerar token de autenticação.", e);
        }
    }
}
