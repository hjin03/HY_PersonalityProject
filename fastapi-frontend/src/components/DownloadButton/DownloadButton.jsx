import React from "react";

const ImageDownloadButton = ({ imageUrl, fileName }) => {
  return (
    <a
      href={imageUrl}
      download={fileName || "image.png"}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.downloadButton}
    >
      이미지 다운로드
    </a>
  );
};

const styles = {
  downloadButton: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
    cursor: "pointer",
  },
};

export default ImageDownloadButton;
