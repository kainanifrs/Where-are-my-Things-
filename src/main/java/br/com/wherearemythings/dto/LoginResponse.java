package br.com.wherearemythings.dto;

public class LoginResponse {
    private boolean sucesso;
    private String mensagem;
    private Long idUsuario;
    private String nome;
    private String tipoUsuario;

    public  LoginResponse(boolean sucesso, String mensagem, Long idUsuario, String nome, String tipoUsuario) {
        this.sucesso = sucesso;
        this.mensagem = mensagem;
        this.idUsuario = idUsuario;
        this.nome = nome;
        this.tipoUsuario = tipoUsuario;
    }

    public boolean isSucesso() {
        return sucesso;
    }

    public String getMensagem() {
        return mensagem;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public String getNome() {
        return nome;
    }

    public String getTipoUsuario(){return tipoUsuario;}
}
