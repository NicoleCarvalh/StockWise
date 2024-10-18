// import React, { useState } from "react";
// import { QrReader } from "react-qr-reader";

// const QrCodeScanner = () => {
//   const [data, setData] = useState("No result");
//   const [isCameraActive, setIsCameraActive] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleScanSuccess = (result) => {
//     if (result) {
//       setData(result?.text);
//     }
//   };

//   const handleError = (error) => {
//     console.error("Erro ao ler QR Code:", error);
//     setErrorMessage("Erro ao acessar a câmera: " + error.name);
//   };

//   const checkCameraPermissions = () => {
//     if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//       setErrorMessage("Câmera não suportada no navegador.");
//       return false;
//     }
//     return true;
//   };

//   const activateCamera = () => {
//     // Verifica suporte à câmera antes de tentar abrir
//     if (checkCameraPermissions()) {
//       setIsCameraActive(true);
//     }
//   };

//   return (
//     <div>
//       <h1>Leitor de QR Code</h1>

//       {!isCameraActive ? (
//         <>
//           <button onClick={activateCamera}>Ativar Câmera</button>
//           {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//         </>
//       ) : (
//         <QrReader
//           onResult={(result, error) => {
//             if (!!result) {
//               handleScanSuccess(result);
//             }

//             if (!!error) {
//               handleError(error);
//             }
//           }}
//           constraints={{
//             facingMode: "environment", // Preferência pela câmera traseira no mobile
//           }}
//           style={{ width: "300px" }}
//         />
//       )}

//       <p>{data}</p>
//     </div>
//   );
// };

// export default QrCodeScanner;
