package br.com.wherearemythings.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "registro")
public class Registro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_registro")
    private Long idRegistro;

    @ManyToOne
    @JoinColumn(name = "id_objeto", nullable = false)
    private Objeto objeto;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(name = "tipo_registro", nullable = false, length = 150)
    private String tipoRegistro;

    @Column(name = "local_ocorrencia", nullable = false)
    private String localOcorrencia;

    @Column(name = "data_ocorrencia", nullable = false)
    private  LocalDateTime dataOcorrencia;

    @Column(name = "observacao")
    private String observacao;

    @Column(name = "status", nullable = false, length = 20)
    private String status = "ATIVO";

    @Column(name = "data_registro", insertable = false, updatable = false)
    private LocalDateTime dataRegistro;

    public Long getIdRegistro() {
        return idRegistro;
    }

    public void setIdRegistro(Long idRegistro) {
        this.idRegistro = idRegistro;
    }

    public Objeto getObjeto() {
        return objeto;
    }

    public void setObjeto(Objeto objeto) {
        this.objeto = objeto;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getTipoRegistro() {
        return tipoRegistro;
    }

    public void setTipoRegistro(String tipoRegistro) {
        this.tipoRegistro = tipoRegistro;
    }

    public String getLocalOcorrencia() {
        return localOcorrencia;
    }

    public void setLocalOcorrencia(String localOcorrencia) {
        this.localOcorrencia = localOcorrencia;
    }

    public LocalDateTime getDataOcorrencia() {
        return dataOcorrencia;
    }

    public void setDataOcorrencia(LocalDateTime dataOcorrencia) {
        this.dataOcorrencia = dataOcorrencia;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDataRegistro() {
        return dataRegistro;
    }

    public void setDataRegistro(LocalDateTime dataRegistro) {
        this.dataRegistro = dataRegistro;
    }
}
