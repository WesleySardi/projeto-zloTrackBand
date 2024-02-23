import { React, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { COLORS, FONTS, SHADOWS } from '../constants/constants';
import InputMask from 'react-input-mask';

const mapShadow = shadowType => {
    const shadowMapping = {
        large: SHADOWS.LARGE_BOX,
        small: SHADOWS.SMALL_BOX,
    };
    
    return shadowMapping[shadowType] || shadowType;
};

const mapFontSize = size => {
    const fontSizeMapping = {
        title: FONTS.TITLE_SIZE,
        caption: FONTS.CAPTION_SIZE,
        text: FONTS.TEXT_SIZE,
        label: FONTS.LABEL_SIZE,
    };
    
    return fontSizeMapping[size] || size;
};

function PhoneField({ width, height, label, fontSize, shadow, value, readOnly = false }) {

    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return "";
        const match = phoneNumber.match(/^(\d{2})(\d)(\d{4})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
        }
        return phoneNumber;
    };

    const [isValidPhone, setIsValidPhone] = useState(null);
    const [phoneValue, setPhoneValue] = useState(formatPhoneNumber(value));

    useEffect(() => {
        validatePhone(phoneValue);
    }, [phoneValue]);

    const validatePhone = (phone) => {
        const regex = /[(][0-9]{2}[)]\s[9][0-9]{4}[-][0-9]{4}/;
        setIsValidPhone(regex.test(phone));
    };

    const handleChange = (e) => {
        setPhoneValue(e.target.value);
    };

    const outOfFocus = () => {
        validatePhone(phoneValue);
    };

    const combinedFieldStyles = {
        ...{
            padding: "10px 20px",
            borderRadius: "5px",
            border: `1px solid`,
            transition: "box-shadow 0.3s, border 0.3s",
            margin: "0 auto",
            fontFamily: FONTS.FAMILY,
            color: COLORS.BLACK,
            backgroundColor: COLORS.WHITE,
        },
        ...{
            width: width,
            height: height,
            boxShadow: mapShadow(shadow),
            fontSize: mapFontSize(fontSize),
            borderColor: isValidPhone ? COLORS.GREEN_MAIN : COLORS.BLUE_MAIN,
        },
    };

    const constLegendStyle = {
        color: COLORS.BLUE_MAIN,
        fontSize: FONTS.LABEL_SIZE,
    };

    const constInputStyle = {
        width: "100%",
        margin: "0.1% 0.1% 2%",
        border: "none",
        fontSize: '17px',
        outline: 0,
        backgroundColor: COLORS.WHITE,
        fontFamily: FONTS.FAMILY,
        textAlign: 'center',
        borderColor: COLORS.BLUE_MAIN,
        color: COLORS.BLUE_MAIN
    };

    return (
        <>
            <fieldset style={combinedFieldStyles}>
                <legend style={constLegendStyle}>{label}</legend>
                <InputMask readOnly={readOnly}
                    mask="(99) 9 9999-9999"
                    value={phoneValue}
                    onChange={handleChange}
                    onBlur={outOfFocus}
                    style={constInputStyle}
                />
            </fieldset>
        </>
    );
}

PhoneField.defaultProps = {
    width: '140px',
    height: '40px',
    label: '',
    fontSize: 'title',
    shadow: 'none',
    isStatic: 'false',
    textContent: '',
};

PhoneField.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    label: PropTypes.node.isRequired,
    isStatic: PropTypes.string,
    fontSize: PropTypes.oneOf(['title', 'caption', 'text', 'label']),
    shadow: PropTypes.oneOf(['none', 'small', 'large']),
};

export default PhoneField;
