import { useState, useEffect } from "react";
import { COLORS, FONTS } from "../constants/constants";
import Input from "../components/Input";
import axios from "axios";
import PhoneField from "../components/PhoneField";
import { toast } from "react-toastify";

const DependentData = () => {
  const [dependentName, setDependentName] = useState("");
  const [dependentAge, setDependentAge] = useState(0);
  const [dependentBloodType, setDependentBloodType] = useState("");
  const [dependentGender, setDependentGender] = useState("");
  const [dependentMedicalReport, setDependentMedicalReport] = useState("");

  const [idDep, setIdDep] = useState(localStorage.getItem("cpfDep"));
  const [emergPhone, setEmergPhone] = useState(
    localStorage.getItem("emergPhone") || ""
  );

  useEffect(() => {
    buscarDados();
  }, []);

  const buscarDados = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/responsiblesAndDependents/webdata/params?idDep=${idDep}&emergPhone=${emergPhone}`
      );
      setDependentName(response.data.nomeDep);
      setDependentAge(response.data.idadeDep);
      setDependentBloodType(response.data.tipoSanguineo);
      setDependentGender(response.data.generoDep);
      setDependentMedicalReport(response.data.laudo);
    } catch (error) {
      toast.error("Erro ao realizar requisição.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  const bgStyle = {
    fontSize: FONTS.TITLE_SIZE,
    height: "85vh",
  };

  const userNameStyle = {
    margin: "4vw 0 1vw",
  };

  const title = {
    margin: "1vw 0vw 2vh 0vw",
    fontSize: "22px",
    color: COLORS.BLUE_MAIN,
  };

  const divInputsStyle = {
    display: "flex",
    height: "50vh",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const downloadLinkStyle = {
    fontSize: FONTS.BUTTON_SIZE,
    color: COLORS.DARK_BLUE,
    fontWeight: "500",
    cursor: "pointer",
  };

  return (
    <div style={bgStyle}>
      <h1 style={userNameStyle}>Nome do usuário</h1>
      <h2 style={title}>{dependentName}</h2>
      <div style={divInputsStyle}>
        <Input
          isEmail={false}
          isStatic={true}
          textContent={dependentAge}
          fieldLabel="Idade"
        />
        <Input
          isEmail={false}
          isStatic={true}
          textContent={dependentBloodType}
          fieldLabel="Tipo sanguíneo"
        />
        <Input
          isEmail={false}
          isStatic={true}
          textContent={dependentGender}
          fieldLabel="Gênero"
        />
        <PhoneField
          fontSize="title"
          shadow="large"
          height="60px"
          width="70%"
          label="Número do Responsável"
          value={emergPhone}
          readOnly={true}
        />
        <a
          style={downloadLinkStyle}
          href={dependentMedicalReport}
          download={dependentMedicalReport}
        >
          Clique para baixar laudo médico do usuário.
        </a>
      </div>
    </div>
  );
};

export default DependentData;
