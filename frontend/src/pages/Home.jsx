import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cpfDep = params.get("cpfDep");
    const emergPhone = params.get("emergPhone");

    if (cpfDep && emergPhone) {
      buscarDados(cpfDep, emergPhone);
    } else {
      console.log("Parâmetros da URL estão faltando.");
      toast.error("URL inválida, tente novamente.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  }, []);

  const buscarDados = async (cpfDep, emergPhone) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/dependents/verifyDependentsCPFandEmergPhone/params?cpfDep=${cpfDep}&emergPhone=${emergPhone}`
      );
      localStorage.setItem("cpfDep", response.data.cpfDep);
      localStorage.setItem("emergPhone", response.data.emergPhone);
      getGeolocation().then((location) => {
        const dadosParaEnviar = {
          depCpf: localStorage.getItem("cpfDep"),
          scanName: "External User",
          scanEmail: "No email",
          scanPhone: localStorage.getItem("emergPhone"),
          ...location,
        };

        axios
          .post("http://localhost:8080/api/scanHistory", dadosParaEnviar)
          .then(() => {
            navigate("/emergencyPhone");
          })
          .catch((error) => {
            console.error("Erro ao enviar dados de localização:", error);
            toast.error("Erro ao enviar dados de localização.", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          });
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        console.log(
          "Algum erro ocorreu, portanto tentaremos buscar os dados do dependente novamente."
        );
        toast.error("Erro ao buscar dados, tentando novamente...", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        buscarDados(cpfDep, emergPhone);
      }, 4000);
    }
  };

  function getGeolocation() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          resolve({ latitude: 0, longitude: 0 });
        }
      );
    });
  }

  const loadingDivStyle = {
    display: "flex",
    height: "80vh",
    flexDirection: "column",
    justifyContent: "center",
  };

  const loadingStyle = {
    fontWeight: "600",
  };

  return (
    <div>
      {loading ? (
        <>
          <div style={loadingDivStyle}>
            <p style={loadingStyle}>Carregando...</p>
          </div>
        </>
      ) : (
        <>
          <div style={loadingDivStyle}></div>
        </>
      )}
    </div>
  );
}

export default Home;
