import React from "react";

const LionImage = ({ imageUrl }) => {
  const containerStyle = {
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
  };

  const imageStyle = {
    maxWidth: "100%",
    height: "auto",
    display: "block",
    margin: "0 auto",
  };

  return (
    <div style={containerStyle}>
      <img src={imageUrl} alt="한양 라이언" style={imageStyle} />
    </div>
  );
};

export default LionImage;
