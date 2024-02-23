import { COLORS, FONTS, INPUTSIZE, SHADOWS } from "../constants/constants";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Input({
  isEmail = false,
  fieldLabel = "Label",
  isStatic = false,
  textContent = "",
  isSms = false,
  mask = null,
  value,
  onChange,
  smsVerifyFunction
}) {
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [emailValue, setEmailValue] = useState("");
  const [widthIsSms, setWidthIsSms] = useState("");

  useEffect(() => {
    if (isSms) setWidthIsSms("60%");
    else setWidthIsSms(INPUTSIZE.INPUT_SIZE);
  })

  let borderColor =
    isValidEmail === true
      ? COLORS.GREEN_MAIN
      : isValidEmail === false
        ? COLORS.RED_MAIN
        : COLORS.BLUE_MAIN;

  const baseStyle = {
    padding: "10px 20px",
    width: widthIsSms,
    height: "7vh",
    borderRadius: "5px",
    border: `1px solid ${borderColor}`,
    boxShadow: SHADOWS.LARGE_BOX,
    fontFamily: FONTS.FAMILY,
    fontSize: FONTS.INPUT_SIZE,
    transition: "box-shadow 0.3s, border 0.3s",
    color: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
    margin: "0 auto"
  };

  const baseStyleLegend = {
    color: COLORS.BLUE_MAIN
  }

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsValidEmail(regex.test(email));
  };

  const handlePhoneMask = (value) => {
    let cleanValue = value.replace(/\D/g, '');
    let formattedValue = cleanValue;

    // Aplicando a máscara (XX) X XXXX-XXXX
    formattedValue = formattedValue
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');

    return formattedValue;
  }

  const handleChange = (e) => {
    if (isSms) {
      onChange && onChange(e);
    } else {
      if (isEmail) {
        setEmailValue(e.target.value);
        onChange && onChange(e); // Passe o evento completo
      } else if (mask === 'phone') {
        e.target.value = handlePhoneMask(e.target.value);
        onChange && onChange(e); // Passe o evento completo
      } else {
        onChange && onChange(e); // Passe o evento completo
      }
    }
  };

  const outOfFocus = () => {
    if (isEmail) {
      validateEmail(emailValue);
    }
  };

  const handleProps = () => {
    if (!isSms) {
      return <>
        {isStatic
          ?
          <input style={{
            width: "100%",
            margin: "0.1% 0.1% 2%",
            outline: 0,
            border: "none",
            fontFamily: FONTS.FAMILY,
            fontSize: '16px',
            textAlign: 'center',
            color: baseStyle.color,
            backgroundColor: baseStyle.backgroundColor,
            fontFamily: FONTS.FAMILY
          }} value={textContent} disabled></input>
          :
          <input
            style={{
              width: "100%",
              margin: "0.1% 0.1% 2%",
              outline: 0,
              border: "none",
              color: baseStyle.color,
              backgroundColor: baseStyle.backgroundColor,
              fontFamily: FONTS.FAMILY,
              fontSize: '16px',
              textAlign: 'center'
            }}
            value={value}
            onChange={handleChange}
            onBlur={outOfFocus}
          ></input>
        }
      </>
    } else {
      return <>
        <input
          style={{
            width: "100%",
            margin: "0.1% 0.1% 2%",
            fontSize: '24px',
            outline: 0,
            border: "none",
            color: baseStyle.color,
            backgroundColor: baseStyle.backgroundColor,
            textAlign: "center",
          }}
          onChange={handleChange}
          onBlur={outOfFocus}
          onKeyUp={(e) => {
            if (e.key == "Enter") {
              e.preventDefault()
              if (e.target.value.length == 0) {
                toast.error("Digite o código enviado por SMS.", {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 3000,
                });
              } else {
                if (e.target.value.length >= 7 && e.target.value.length < 9) {
                  smsVerifyFunction(e.target.value)
                } else {
                  toast.error("Você deve digitar um código de 7 ou 8 dígitos.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                  });
                }
              }
            }
          }}
          type="number"
        ></input>
      </>
    }
  }

  return (
    <fieldset
      style={{
        ...baseStyle,
      }}
    >
      <legend style={baseStyleLegend}>{fieldLabel}</legend>
      {handleProps()}
    </fieldset>
  );
}

export default Input;
