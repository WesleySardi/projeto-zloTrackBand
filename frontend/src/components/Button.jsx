import React from 'react'
import PropTypes from 'prop-types'
import { COLORS, FONTS, INPUTSIZE, SHADOWS } from '../constants/constants'

/* Funções que utiliza o props enviado para mapear e utilizar 
a estilização desejada através de um objeto dentro dela */
const mapShadow = shadowType => {
    const shadowMapping = {
        large: SHADOWS.LARGE_BOX,
        small: SHADOWS.SMALL_BOX,
    }
    
    return shadowMapping[shadowType] || shadowType

}
const mapFontSize = size => {
    const fontSizeMapping = {
        title: FONTS.TITLE_SIZE,
        caption: FONTS.CAPTION_SIZE,
        text: FONTS.TEXT_SIZE,
        button: FONTS.BUTTON_SIZE
    }
    
    return fontSizeMapping[size] || size

}
const mapColor = color => {
    const colorMapping = {
        lightBlue: COLORS.LIGHT_BLUE,
        blue: COLORS.BLUE_MAIN,
        darkBlue: COLORS.DARK_BLUE,
        red: COLORS.RED_MAIN,
        green: COLORS.GREEN_MAIN,
    }
    
    return colorMapping[color] || color
}


function Button({width, height, shadow, fontSize, color, children, onClick}) {
    /* Definindo os dados CSS estáticos através de uma constante
    /* Definindo os dados CSS estáticos através de uma constante
    dentro do próprio componente */
    const constantStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        color: 'white',
        fontFamily: FONTS.FAMILY,
    }
    
    /* Definindo os dados CSS variáveis por props através de uma 
    segunda constante dentro do próprio componente */
    const propBasedStyle = {
        width: width,
        height: height,
        /* Buscando pela função que irá mapear o props enviado e retornar o 
        valor desejado a partir disso */
        boxShadow: mapShadow(shadow),
        fontSize: mapFontSize(fontSize),
        backgroundColor: mapColor(color),

    }

    /* Constante reponsável por mesclar os estílos variáveis e estáticos */
    const combinedStyles = {...constantStyle, ...propBasedStyle}

    return (
        <button style={combinedStyles} onClick={onClick}>
            {children}
            {/* Recebe o que foi colocado <> Entre as Tags do componente </> */ }
        </button>
    )
}

/* Define as props com o valor selecionado por padrão 
caso a mesma não seja enviada ao utilizar os props do componente */ 
Button.defaultProps = {
    color: 'blue',
    fontSize: 'button',
    shadow: 'none',
    width: INPUTSIZE.INPUT_SIZE,
    height: '60px',
    children: 'Botão',
    margin: '0px auto',
}

Button.propTypes = {
    /* Define as props com o tipo de dado esperado 
    caso a mesma não seja enviada ao utilizar os props do componente */
    width: PropTypes.string,
    height: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,

    /* Define props que esperam informações fixas para serem utilizadas, 
    caso o props não siga as opções, será utilizado o padrão em 'defaultProps' */
    shadow: PropTypes.oneOf(['none', 'small', 'large']),
    fontSize: PropTypes.oneOf(['title', 'caption', 'text', 'button']),
    color: PropTypes.oneOf(['lightBlue', 'blue', 'darkBlue', 'red', 'green']),
}

export default Button