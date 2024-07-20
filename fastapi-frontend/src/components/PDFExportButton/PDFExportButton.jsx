import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PDFExportButton = ({ targetRef, fileName = "result.pdf" }) => {
  const exportToPDF = async () => {
    const element = targetRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(fileName);
  };

  return <button onClick={exportToPDF}>PDF로 저장</button>;
};

export default PDFExportButton;
