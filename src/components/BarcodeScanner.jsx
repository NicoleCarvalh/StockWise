import React, { useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const BarcodeScanner = () => {
  useEffect(() => {
    const scannerId = "reader";
    const html5QrCode = new Html5Qrcode(scannerId);

    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        const cameraId = devices[0].id;
        html5QrCode.start(
          cameraId,
          {
            fps: 60,
            qrbox: 300,
          },
          (decodedText, decodedResult) => {
            console.log("Código lido:", decodedText);
            html5QrCode.stop(); // Para parar após uma leitura
          },
          (errorMessage) => {
            // erros de leitura podem ser ignorados ou tratados
          }
        ).catch(err => console.error("Erro ao iniciar câmera:", err));
      }
    }).catch(err => console.error("Erro ao buscar câmeras:", err));

    return () => {
      html5QrCode.stop().catch(err => console.error("Erro ao parar câmera:", err));
    };
  }, []);

  return <div id="reader" style={{ width: "100%", height: "300px" }}></div>;
};

export { BarcodeScanner }
