package br.com.wherearemythings.dto;

public class RedefinirSenhaRequest {
    private String token;
    private String novaSenha;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNovaSenha() {
        return novaSenha;
    }

    public void setNovaSenha() {
        this.novaSenha = novaSenha;
    }
}
