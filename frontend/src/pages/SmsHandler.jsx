import { useState, useEffect } from "react";
import { COLORS, FONTS } from "../constants/constants";
import GiphyEmbed from "../components/GiphyEmbed";
import Input from "../components/Input";
import axios from "axios";
import getFunctions from "../functions/getFunctions";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SmsHandler = () => {
  const navigate = useNavigate();
  const [smsValue, setSmsValue] = useState(0);

  const [smsData] = useState({
    sendDate: "",
    cpfDep: "",
    phoneUser: "",
  });

  const bgStyle = {
    fontSize: FONTS.TITLE_SIZE,
    height: "85vh",
  };

  const title = {
    margin: "0 2vw",
    fontWeight: "normal",
    textAlign: "center",
    marginTop: "5vh",
    fontSize: FONTS.BUTTON_SIZE,
  };

  const divInputsStyle = {
    display: "flex",
    height: "30vh",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "20px 20px",
  };

  const paragraphStyle = {
    fontSize: FONTS.BUTTON_SIZE,
  };

  const span = {
    color: COLORS.BLUE_MAIN,
    fontWeight: "800",
  };

  const fillData = () => {
    smsData.sendDate = getFunctions.generateTimestamp();
    smsData.phoneUser = localStorage.getItem("scanPhone");
    smsData.cpfDep = localStorage.getItem("cpfDep");
    smsHandlerFunction();
  };

  const smsHandlerFunction = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/smshandler/",
        smsData
      );
      if (response) return toast.success("SMS enviado com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar SMS.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  const smsVerifyFunction = async (smsCode) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/smshandler/verifySmsCode?smsCode=${smsCode}&returnDate=${getFunctions.generateTimestamp()}&cpfDep=${localStorage.getItem(
          "cpfDep"
        )}`
      );
      if (response) return navigate("/dependentData");
    } catch (error) {
      console.error(error);
      toast.error("Valor inválido. Tente novamente ou reenvie o código SMS.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fillData();
  }, []);

  return (
    <div style={bgStyle}>
      <GiphyEmbed
        src="https://giphy.com/embed/2wWBH0vXsVUmKtRJOe"
        width="200"
        height="200"
      />
      <h1>Código enviado!</h1>
      <h2 style={title}>
        Um código foi enviado ao seu celular. Insira ele no campo abaixo para
        prosseguir.
      </h2>
      <div style={divInputsStyle}>
        <Input
          isEmail={false}
          isStatic={false}
          isSms={true}
          fieldLabel="Código SMS"
          value={smsValue}
          onChange={(e) => setSmsValue(e.target.value)}
          smsVerifyFunction={(smsValue) => smsVerifyFunction(smsValue)}
        />
        <Button
          onClick={() => {
            if (smsValue.length == 0) {
                toast.error("Digite o código enviado no seu celular.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                  });
            } else {
              if (smsValue.length >= 7 && smsValue.length < 9) {
                smsVerifyFunction(smsValue);
              } else {
                toast.error("O Você deve digitar um código de 7 ou 8 números.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                  });
              }
            }
          }}
        >
          {"Confirmar"}
        </Button>
        <p style={paragraphStyle}>
          Não recebeu? Reenvie o código{" "}
          <span style={span} onClick={() => fillData()}>
            clicando aqui!
          </span>
        </p>
      </div>
    </div>
  );
};

export default SmsHandler;
