package br.com.wherearemythings.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String remetente;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void enviarEmailRecuperacao(String destinatario, String link) {
        SimpleMailMessage mensagem = new SimpleMailMessage();

        mensagem.setFrom(remetente);
        mensagem.setTo(destinatario);
        mensagem.setSubject("Recuperação de senha - Where are my Things");

        mensagem.setText(
                "Olá!\n\n" + "Recebemos uma solicitação para redefinir sua senha.\n\n" +
                        "Clique no link abaixo para cadastrar uma nova senha:\n\n" + link + "\n\n" +
                        "Este link é válido por 30 minutos e só pode ser utilizado uma vez.\n\n" +
                        "Se você não solicitou a recuperação, ignore este e-mail.\n\n" +
                        "Equipe Where are my Things"
        );

        mailSender.send(mensagem);
    }
}
