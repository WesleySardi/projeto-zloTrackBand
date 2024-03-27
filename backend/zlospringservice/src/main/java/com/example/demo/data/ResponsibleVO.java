package com.example.demo.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.github.dozermapper.core.Mapping;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@JsonPropertyOrder({"cpfRes", "nomeRes", "idadeRes", "contato1Res", "contato2Res", "contato3Res", "planoAssinado", "emailRes", "enderecoIdRes", "rgRes", "senhaRes"})
public class ResponsibleVO extends RepresentationModel<ResponsibleVO> implements Serializable {

    @Serial
    private static final long serialVersionUID = -1907032921662951285L;

    @JsonProperty("cpfRes")
    @Mapping("cpfRes")
    private String key;
    private String nomeRes;
    private Integer idadeRes;
    private String contato1Res;
    private String contato2Res;
    private String contato3Res;
    private Integer planoAssinado;
    private String emailRes;
    private Integer enderecoIdRes;
    private String rgRes;
    private String senhaRes;

    public ResponsibleVO() {
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
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
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        ResponsibleVO that = (ResponsibleVO) o;
        return Objects.equals(key, that.key) && Objects.equals(nomeRes, that.nomeRes) && Objects.equals(idadeRes, that.idadeRes) && Objects.equals(contato1Res, that.contato1Res) && Objects.equals(contato2Res, that.contato2Res) && Objects.equals(contato3Res, that.contato3Res) && Objects.equals(planoAssinado, that.planoAssinado) && Objects.equals(emailRes, that.emailRes) && Objects.equals(enderecoIdRes, that.enderecoIdRes) && Objects.equals(rgRes, that.rgRes) && Objects.equals(senhaRes, that.senhaRes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), key, nomeRes, idadeRes, contato1Res, contato2Res, contato3Res, planoAssinado, emailRes, enderecoIdRes, rgRes, senhaRes);
    }
}
