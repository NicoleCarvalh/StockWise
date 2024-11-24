import React, { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core"; // Para visualizar PDFs
import "@react-pdf-viewer/core/lib/styles/index.css"; // Estilos básicos do visualizador

const PdfViewer = ({ url }) => {
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        setPdfData(new Uint8Array(arrayBuffer));
      } catch (error) {
        console.error("Erro ao buscar o PDF:", error);
      }
    };

    fetchPdf();
  }, [url]);

  if (!pdfData) {
    return <p>Carregando PDF...</p>;
  }

  return (
    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
      <div className="h-full w-full">
        <Viewer fileUrl={pdfData} defaultScale="PageWidth" />
      </div>
    </Worker>
  );
};

export { PdfViewer }