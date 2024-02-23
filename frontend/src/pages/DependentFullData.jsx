import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FONTS } from '../constants/constants';
import Input from '../components/Input';
import axios from 'axios';
import Button from '../components/Button';
import { toast } from "react-toastify";

const DependentFullData = () => {
    const [scanName, setScanName] = useState('');
    const [scanEmail, setScanEmail] = useState('');
    const [scanPhone, setScanPhone] = useState('');
    const [enviandoDados, setEnviandoDados] = useState(false);
    const navigate = useNavigate();
    const depCpf = localStorage.getItem("cpfDep");

    const enviarDados = async () => {
        setEnviandoDados(true);

        const numeroTelefone = scanPhone.replace(/\D/g, '');

        solicitarLocalizacao(numeroTelefone);
    };

    const solicitarLocalizacao = (numeroTelefone) => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const dadosParaEnviar = {
                    depCpf,
                    scanName,
                    scanEmail,
                    scanPhone: numeroTelefone,
                    latitude,
                    longitude
                };

                try {
                    const response = await axios.post('http://localhost:8080/api/scanHistory', dadosParaEnviar);
                    localStorage.setItem('scanPhone', response.data.scanPhone);
                    navigate('/smsHandler');
                } catch (error) {
                    console.error('Erro ao enviar os dados:', error);
                    toast.error("Erro ao enviar os dados, revise e tente novamente.", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000,
                      });
                } finally {
                    setEnviandoDados(false);
                }
            }, 
            async (error) => {
                const latitude = 0;
                const longitude = 0;

                const dadosParaEnviar = {
                    depCpf,
                    scanName,
                    scanEmail,
                    scanPhone: numeroTelefone,
                    latitude,
                    longitude
                };

                try {
                    const response = await axios.post('http://localhost:8080/api/scanHistory', dadosParaEnviar);
                    toast.success("Dados enviados com sucesso!", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 5000
                      });
                } catch (error) {
                    toast.error("Erro ao enviar dados, tente novamente.", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000,
                      });
                }
            },
            { 
                timeout: 10000, 
                maximumAge: 60000, 
                enableHighAccuracy: true 
            }
        );
    };

    const bgStyle = {
        fontSize: FONTS.INPUT_SIZE,
        height: "85vh",
        marginTop: "50px"
    };

    const divInputsStyle = {
        display: "flex",
        height: "50vh",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    };

    const constantTextStyle = {
        textAlign: 'center',
        fontSize: FONTS.BUTTON_SIZE,
        lineHeight: 1.5,
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px'
    }

    const inputStyle = {
        fontFamily: FONTS.FAMILY,
    }

    return (
        <div style={bgStyle}>

            <h1>Solicitar dados do dependente</h1>

            <p style={constantTextStyle}>Para uma maior segurança do usuário da pulseira, necessitamos coletar alguns dados pessoais seus.</p>
            <p style={constantTextStyle}>Caso deseje prosseguir, preencha os campos abaixo e realize a autenticação de dois fatores.</p>

            <div style={divInputsStyle}>
                <Input
                    style={inputStyle}
                    fieldLabel="Nome completo"
                    value={scanName}
                    onChange={(e) => setScanName(e.target.value)}
                />
                <Input
                    isEmail={true}
                    fieldLabel="E-mail"
                    value={scanEmail}
                    onChange={(e) => setScanEmail(e.target.value)}
                />
                <Input
                    fieldLabel="Telefone"
                    mask="phone"
                    value={scanPhone}
                    onChange={(e) => setScanPhone(e.target.value)}
                />
                <Button onClick={enviarDados} disabled={enviandoDados}>
                    {enviandoDados ? 'Enviando...' : 'Enviar'}
                </Button>
            </div>
        </div>
    );
};

export default DependentFullData;