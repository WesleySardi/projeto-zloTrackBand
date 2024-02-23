import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PhoneField from "../components/PhoneField";
import { COLORS } from "../constants/constants";
import { toast } from "react-toastify";

const EmergencyPhone = () => {
  const [idDep, setIdDep] = useState("");
  const [emergPhone, setEmergencyPhone] = useState(
    localStorage.getItem("emergPhone") || ""
  );
  const [dependentName, setDependentName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cpfDep = localStorage.getItem("cpfDep");

    const cpfDepLocal = localStorage.getItem("cpfDep");
    if (cpfDepLocal) {
      buscarDadosDependente(cpfDep);
    } else {
      console.log("CPF do dependente não encontrado no localStorage.");
      toast.error("CPF não encontrado, escaneie novamente a pulseira.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  }, []);

  const buscarDadosDependente = async (cpfDep) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/dependents/${cpfDep}`
      );
      setDependentName(response.data.nomeDep);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao buscar dados, tentando novamente...", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  const constantTextStyle = {
    textAlign: "center",
    lineHeight: 1.5,
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
  };

  const constantImgStyle = {
    marginTop: "50px",
  };

  const constantFooterStyle = {
    textAlign: "center",
    position: "absolute",
    bottom: "25px",
    width: "100%",
  };

  const moreInfoStyle = {
    textDecoration: "none",
    color: COLORS.LIGHT_BLUE,
    fontWeight: "500",
  };

  const needInfoStyle = {
    margin: "0px",
  };

  const dependentNameStyle = {
    color: COLORS.BLUE_MAIN,
    fontWeight: "500",
  };

  return (
    <>
      <p style={constantTextStyle}>
        Bem-vindo a ZLO Trackband. A pessoa que você encontrou se chama{" "}
        <span style={dependentNameStyle}>{dependentName}</span>, e o seu
        responsável atende pelo número abaixo.
      </p>
      <p style={constantTextStyle}>
        Por favor, informe-o pelo bem do indíviduo em questão.
      </p>

      <PhoneField
        fontSize="title"
        shadow="large"
        height="60px"
        width="50%"
        label="Número de Emergência"
        value={emergPhone}
        readOnly={true}
      />

      <a href={`tel:+55${localStorage.getItem("emergPhone")}`}>
        <img
          style={constantImgStyle}
          src="../../img/EmergencyCall.png"
          alt=""
        />
      </a>

      <footer style={constantFooterStyle}>
        <p style={needInfoStyle}>
          Precisa de mais informações sobre o usuário?
        </p>
        <Link to="/dependentFullData" style={moreInfoStyle}>
          Clique aqui!
        </Link>
      </footer>
    </>
  );
};

export default EmergencyPhone;