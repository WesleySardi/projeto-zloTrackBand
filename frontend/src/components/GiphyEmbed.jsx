import React from "react";

const GiphyEmbed = ({ src, width, height }) => {
    return (
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    <iframe
        src={src}
        width={width}
        height={height}
        allowFullScreen
        style={{ pointerEvents: "none" }}
        frameBorder="0"
    ></iframe>
    );
};

export default GiphyEmbed;