package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "responsavel")
public class Responsible implements Serializable {

    @Serial
    private static final long serialVersionUID = -5996657227761996072L;

    @Id
    @Column(name = "cpf_res")
    private String cpfRes;

    @Column(name = "nome_res")
    private String nomeRes;

    @Column(name = "idade_res")
    private Integer idadeRes;

    @Column(name = "contato1_res")
    private String contato1Res;

    @Column(name = "contato2_res")
    private String contato2Res;

    @Column(name = "contato3_res")
    private String contato3Res;

    @Column(name = "plano_assinado")
    private Integer planoAssinado;

    @Column(name = "email_res")
    private String emailRes;

    @Column(name = "endereco_id_res")
    private Integer enderecoIdRes;

    @Column(name = "rg_res")
    private String rgRes;

    @Column(name = "senha_res")
    private String senhaRes;

    public Responsible() {
    }

    public String getCpfRes() {
        return cpfRes;
    }

    public void setCpfRes(String cpfRes) {
        this.cpfRes = cpfRes;
    }

    public String getNomeRes() {
        return nomeRes;
    }

    public void setNomeRes(String nomeRes) {
        this.nomeRes = nomeRes;
    }

    public Integer getIdadeRes() {
        return idadeRes;
    }

    public void setIdadeRes(Integer idadeRes) {
        this.idadeRes = idadeRes;
    }

    public String getContato1Res() {
        return contato1Res;
    }

    public void setContato1Res(String contato1Res) {
        this.contato1Res = contato1Res;
    }

    public String getContato2Res() {
        return contato2Res;
    }

    public void setContato2Res(String contato2Res) {
        this.contato2Res = contato2Res;
    }

    public String getContato3Res() {
        return contato3Res;
    }

    public void setContato3Res(String contato3Res) {
        this.contato3Res = contato3Res;
    }

    public Integer getPlanoAssinado() {
        return planoAssinado;
    }

    public void setPlanoAssinado(Integer planoAssinado) {
        this.planoAssinado = planoAssinado;
    }

    public String getEmailRes() {
        return emailRes;
    }

    public void setEmailRes(String emailRes) {
        this.emailRes = emailRes;
    }

    public Integer getEnderecoIdRes() {
        return enderecoIdRes;
    }

    public void setEnderecoIdRes(Integer enderecoIdRes) {
        this.enderecoIdRes = enderecoIdRes;
    }

    public String getRgRes() {
        return rgRes;
    }

    public void setRgRes(String rgRes) {
        this.rgRes = rgRes;
    }

    public String getSenhaRes() {
        return senhaRes;
    }

    public void setSenhaRes(String senhaRes) {
        this.senhaRes = senhaRes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Responsible that)) return false;
        return Objects.equals(getCpfRes(), that.getCpfRes()) && Objects.equals(getNomeRes(), that.getNomeRes()) && Objects.equals(getIdadeRes(), that.getIdadeRes()) && Objects.equals(getContato1Res(), that.getContato1Res()) && Objects.equals(getContato2Res(), that.getContato2Res()) && Objects.equals(getContato3Res(), that.getContato3Res()) && Objects.equals(getPlanoAssinado(), that.getPlanoAssinado()) && Objects.equals(getEmailRes(), that.getEmailRes()) && Objects.equals(getEnderecoIdRes(), that.getEnderecoIdRes()) && Objects.equals(getRgRes(), that.getRgRes()) && Objects.equals(getSenhaRes(), that.getSenhaRes());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCpfRes(), getNomeRes(), getIdadeRes(), getContato1Res(), getContato2Res(), getContato3Res(), getPlanoAssinado(), getEmailRes(), getEnderecoIdRes(), getRgRes(), getSenhaRes());
    }
}
