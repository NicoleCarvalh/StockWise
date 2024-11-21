import React, { createContext, useContext, useState } from "react";

const QrScannerContext = createContext();

export const QrScannerProvider = ({ children }) => {
  const [qrScanner, setQrScanner] = useState(null);

  const closeQrScanner = () => {
    if (qrScanner) {
      qrScanner.destroy();
      setQrScanner(null);
    }
  };

  return (
    <QrScannerContext.Provider value={{ qrScanner, setQrScanner, closeQrScanner }}>
      {children}
    </QrScannerContext.Provider>
  );
};

export const useQrScanner = () => useContext(QrScannerContext);