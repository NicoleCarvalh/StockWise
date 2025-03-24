import QrScanner from "qr-scanner"
import { useContext, useRef, useState } from "react"
import { Button } from "./ui/button"
import { ScanBarcode, ScanQrCode, X } from "lucide-react"
import clsx from "clsx"
import { AuthContext } from "@/auth/AuthProvider"
import { useQrScanner } from "@/context/ScannerContextProvider"

function QRCodeScanner({buttonClassName = "", callAfterFound = null, disableAbsoluteModal=false, entity="product", scannerType = "QRCode"}) {
    const { credentials } = useContext(AuthContext)
    const videoElement = useRef(null)
    const [result, setResult] = useState(null)
    const [foundProduct, setFoundProduct] = useState(null)
    const [foundContainer, setFoundContainer] = useState(null)
    const [isScanning, setIsScanning] = useState(false)
    const [scannerInstance, setScannerInstance] = useState(null)

    const { qrScanner, setQrScanner, closeQrScanner } = useQrScanner();

    function stopScanner() {
        if(scannerInstance) {
            setIsScanning(false)
            scannerInstance.stop()
            scannerInstance.destroy()
    
            setScannerInstance(null)
        }

        document.body.style.overflow = 'unset';
    }

    function handleScanner(toStart) {
        setIsScanning(toStart)

        if(!toStart && scannerInstance) {
            stopScanner()            
            return
        }

        document.body.style.overflow = 'hidden';

        const scanner = new QrScanner(videoElement.current, (scannResult) => {
            const foundCodeProduct = scannResult.data

            setResult(foundCodeProduct)

            fetch(`${import.meta.env.VITE_API_BASE_URL}/${entity}?code=${foundCodeProduct.slice(1)}`, {
                headers: {
                "Authorization": `Bearded ${credentials.token}`
                }
            }).then(json => json.json()).then(entityFound => {
                if(entityFound.length > 0) {
                    entity == "product" && setFoundProduct(entityFound[0])
                    entity == "virtualStock" && setFoundContainer(entityFound[0])

                    if(callAfterFound){
                        callAfterFound(entityFound[0])

                        if(!disableAbsoluteModal) {
                            document.querySelector("div[data-is-close-modal-element=true]")?.click()
                        }
                        stopScanner()
                    } 
                }
            })
        },
        {
            returnDetailedScanResult: true,
            highlightScanRegion: true,
            highlightCodeOutline: true,
            maxScansPerSecond: 1
        })
        scanner.setInversionMode("both")
        scanner.start()

        setScannerInstance(scanner)
        setQrScanner(scanner)
    }

    function handleModal(ev) {
        const elementEvent = ev.target
        
        elementEvent.getAttribute("data-is-close-modal-element") ? handleScanner(!isScanning) : null
    }

    // console.log(document.querySelector("div[data-is-close-modal-element]"))
    // document.addEventListener("click", (event) => {
    //     const targetElement = document.querySelector("div[data-is-close-modal-element]")
    //     if (!targetElement.contains(event.target)) {
    //         console.log('Clique fora do elemento!');
    //         // Adicione aqui a lógica para quando o clique for fora
    //     } else {

    //         console.log('Clique DENTRO do elemento!');
    //     }

    // })

    return (
        <>
            {
                scannerType == "QRCode" ? 
                <Button 
                    type="button"
                    onClick={() => handleScanner(true)}
                    className={clsx(buttonClassName, "flex items-center gap-2 bg-transparent text-wise-hyper_black p-0 hover:text-wise-light_white hover:p-2 transition-all")}
                >
                    <ScanQrCode />
                    Scanear QRCode
                </Button> 
                :
                <Button
                    type="button"
                    onClick={() => handleScanner(true)}
                    className={clsx(buttonClassName, "flex items-center gap-2 bg-transparent text-wise-hyper_black p-0 hover:text-wise-light_white hover:p-2 transition-all")}
                >
                    <ScanBarcode />
                    Scanear código de barras
                </Button>

            }
            

            {!disableAbsoluteModal ?
                <div
                    className={isScanning ? "absolute z-50 min-w-full min-h-full overflow-hidden bg-black/[.7] top-0 left-0 flex items-center justify-center" : "hidden"}

                    onClick={handleModal}
                    data-is-close-modal-element={true}
                >
                    <div className="max-w-[600px] min-h-[350px] bg-wise-light_white p-6 overflow-auto rounded-md flex flex-col gap-3">
                        <div className="flex justify-between flex-wrap gap-4 items-start">
                            <div className="max-w-[70%]">
                                <h2 className="font-semibold">
                                    
                                    Leitor de {scannerType}
                                </h2>
                                <p className="text-sm">Aponte a câmera do dispositivo para o {scannerType} do produto/container que deseja buscar.</p>
                            </div>

                            <Button 
                                type="button" 
                                onClick={() => handleScanner(false)}
                                className="bg-transparent text-wise-hyper_black hover:bg-transparent hover:text-wise-dark_green"
                                data-is-close-modal-element={true}
                            >
                                <X size={20}></X>
                            </Button>
                        </div>
                        <div>
                            <video
                                className="rounded-sm"
                                ref={videoElement} 
                            />
                        </div>

                        {!callAfterFound && <p>Resultado: {foundProduct && foundProduct?.code}</p>}
                    </div>
                </div> :
                null
            }

            {disableAbsoluteModal ?
                <div className={!isScanning ? "hidden" : "w-full min-h-[350px] bg-wise-light_white p-6 overflow-auto rounded-md flex flex-col gap-3"}>
                    <div className="flex justify-between flex-wrap gap-4 items-start">
                        <div className="max-w-[70%]">
                            <h2 className="font-semibold">Leitor de {scannerType}</h2>
                            <p className="text-sm">Aponte a câmera do dispositivo para o {scannerType} do produto/container que deseja buscar.</p>
                        </div>

                        <Button 
                            type="button" 
                            onClick={() => handleScanner(false)}
                            className="bg-transparent text-wise-hyper_black hover:bg-transparent hover:text-wise-dark_green"
                            data-is-close-modal-element={true}
                        >
                            <X size={20}></X>
                        </Button>
                    </div>
                    <div>
                        <video
                            className="rounded-sm"
                            ref={videoElement} 
                        />
                    </div>

                    {!callAfterFound && <p>Resultado: {foundProduct ? foundProduct?.code : foundContainer ? foundContainer : null}</p>}
                </div>
                :
                null
            }
        </>
    )
}

export { QRCodeScanner }








// import QrScanner from "qr-scanner";
// import { Html5Qrcode } from "html5-qrcode";
// import { useContext, useRef, useState } from "react";
// import { Button } from "./ui/button";
// import { ScanBarcode, ScanQrCode, X } from "lucide-react";
// import clsx from "clsx";
// import { AuthContext } from "@/auth/AuthProvider";
// import { useQrScanner } from "@/context/ScannerContextProvider";

// function QRCodeScanner({ buttonClassName = "", callAfterFound = null, disableAbsoluteModal = false, entity = "product", scannerType = "QRCode" }) {
//     const { credentials } = useContext(AuthContext);
//     const videoElement = useRef(null);
//     const html5QrCodeRef = useRef(null); // Para manter instância do html5-qrcode
//     const [result, setResult] = useState(null);
//     const [foundProduct, setFoundProduct] = useState(null);
//     const [foundContainer, setFoundContainer] = useState(null);
//     const [isScanning, setIsScanning] = useState(false);
//     const [scannerInstance, setScannerInstance] = useState(null);

//     const { qrScanner, setQrScanner, closeQrScanner } = useQrScanner();

//     function stopScanner() {
//         if (scannerType === "QRCode") {
//             if (scannerInstance) {
//                 setIsScanning(false);
//                 scannerInstance.stop();
//                 scannerInstance.destroy();
//                 setScannerInstance(null);
//             }
//         } else {
//             if (html5QrCodeRef.current) {
//                 html5QrCodeRef.current.stop().then(() => {
//                     html5QrCodeRef.current.clear();
//                     html5QrCodeRef.current = null;
//                     setIsScanning(false);
//                 });
//             }
//         }
//         document.body.style.overflow = 'unset';
//     }

//     function handleScanner(toStart) {
//         setIsScanning(toStart);

//         if (!toStart) {
//             stopScanner();
//             return;
//         }

//         document.body.style.overflow = 'hidden';

//         if (scannerType === "QRCode") {
//             const scanner = new QrScanner(videoElement.current, (scannResult) => {
//                 const foundCodeProduct = scannResult.data;
//                 setResult(foundCodeProduct);

//                 fetch(`${import.meta.env.VITE_API_BASE_URL}/${entity}?code=${foundCodeProduct.slice(1)}`, {
//                     headers: {
//                         "Authorization": `Bearded ${credentials.token}`
//                     }
//                 }).then(json => json.json()).then(entityFound => {
//                     if (entityFound.length > 0) {
//                         entity == "product" && setFoundProduct(entityFound[0]);
//                         entity == "virtualStock" && setFoundContainer(entityFound[0]);

//                         if (callAfterFound) {
//                             callAfterFound(entityFound[0]);
//                             if (!disableAbsoluteModal) {
//                                 document.querySelector("div[data-is-close-modal-element=true]")?.click();
//                             }
//                             stopScanner();
//                         }
//                     }
//                 });
//             },
//                 {
//                     returnDetailedScanResult: true,
//                     highlightScanRegion: true,
//                     highlightCodeOutline: true,
//                     maxScansPerSecond: 1
//                 }
//             );
//             scanner.setInversionMode("both");
//             scanner.start();
//             setScannerInstance(scanner);
//             setQrScanner(scanner);
//         } else {
//             const html5QrCode = new Html5Qrcode("html5-barcode-reader");
//             html5QrCodeRef.current = html5QrCode;

//             Html5Qrcode.getCameras().then(async (devices) => {

//                 console.log("ENTROU NO Html5Qrcode");
//                 if (devices && devices.length) {
//                     console.log("ENTROU NO devices", devices);

//                     const cameraId = devices[0].id;
//                     await html5QrCode.start(
//                         cameraId,
//                         {
//                             fps: 10,
//                             qrbox: { width: 250, height: 250 }
//                         },
//                         (decodedText, decodedResult) => {
//                             console.log("Código lido:", decodedText);
//                             setResult(decodedText);
//                             console.log("decodedResult lido:", decodedResult);
//                             setResult(decodedResult);

//                             fetch(`${import.meta.env.VITE_API_BASE_URL}/${entity}?code=${decodedText}`, {
//                                 headers: {
//                                     "Authorization": `Bearded ${credentials.token}`
//                                 }
//                             }).then(json => json.json()).then(entityFound => {
//                                 if (entityFound.length > 0) {
//                                     entity == "product" && setFoundProduct(entityFound[0]);
//                                     entity == "virtualStock" && setFoundContainer(entityFound[0]);

//                                     if (callAfterFound) {
//                                         callAfterFound(entityFound[0]);
//                                         if (!disableAbsoluteModal) {
//                                             document.querySelector("div[data-is-close-modal-element=true]")?.click();
//                                         }
//                                         stopScanner();
//                                     }
//                                 }
//                             });
//                         },
//                         (errorMessage) => {
//                             // Pode ignorar erros de leitura
//                             console.log("erro :(", errorMessage);
//                         }
//                     );
//                 }
//             }).catch(err => console.error("Erro ao buscar câmeras:", err));
//         }
//     }

//     function handleModal(ev) {
//         const elementEvent = ev.target;
//         elementEvent.getAttribute("data-is-close-modal-element") ? handleScanner(!isScanning) : null;
//     }

//     return (
//         <>
//             {scannerType == "QRCode" ?
//                 <Button
//                     type="button"
//                     onClick={() => handleScanner(true)}
//                     className={clsx(buttonClassName, "flex items-center gap-2 bg-transparent text-wise-hyper_black p-0 hover:text-wise-light_white hover:p-2 transition-all")}
//                 >
//                     <ScanQrCode />
//                     Scanear QRCode
//                 </Button>
//                 :
//                 <Button
//                     type="button"
//                     onClick={() => handleScanner(true)}
//                     className={clsx(buttonClassName, "flex items-center gap-2 bg-transparent text-wise-hyper_black p-0 hover:text-wise-light_white hover:p-2 transition-all")}
//                 >
//                     <ScanBarcode />
//                     Scanear código de barras
//                 </Button>
//             }

//             {!disableAbsoluteModal ?
//                 <div
//                     className={isScanning ? "absolute z-50 min-w-full min-h-full overflow-hidden bg-black/[.7] top-0 left-0 flex items-center justify-center" : "hidden"}
//                     onClick={handleModal}
//                     data-is-close-modal-element={true}
//                 >
//                     <div className="max-w-[600px] min-h-[350px] bg-wise-light_white p-6 overflow-auto rounded-md flex flex-col gap-3">
//                         <div className="flex justify-between flex-wrap gap-4 items-start">
//                             <div className="max-w-[70%]">
//                                 <h2 className="font-semibold">
//                                     Leitor de {scannerType}
//                                 </h2>
//                                 <p className="text-sm">Aponte a câmera do dispositivo para o {scannerType} do produto/container que deseja buscar.</p>
//                             </div>

//                             <Button
//                                 type="button"
//                                 onClick={() => handleScanner(false)}
//                                 className="bg-transparent text-wise-hyper_black hover:bg-transparent hover:text-wise-dark_green"
//                                 data-is-close-modal-element={true}
//                             >
//                                 <X size={20}></X>
//                             </Button>
//                         </div>
//                         <div>
//                             {scannerType === "QRCode" ?
//                                 <video className="rounded-sm" ref={videoElement} />
//                                 :
//                                 <div id="html5-barcode-reader" className="rounded-sm" />
//                             }
//                         </div>

//                         {!callAfterFound && <p>Resultado: {foundProduct && foundProduct?.code}</p>}
//                     </div>
//                 </div> :
//                 null
//             }

//             {disableAbsoluteModal ?
//                 <div className={!isScanning ? "hidden" : "w-full min-h-[350px] bg-wise-light_white p-6 overflow-auto rounded-md flex flex-col gap-3"}>
//                     <div className="flex justify-between flex-wrap gap-4 items-start">
//                         <div className="max-w-[70%]">
//                             <h2 className="font-semibold">Leitor de {scannerType}</h2>
//                             <p className="text-sm">Aponte a câmera do dispositivo para o {scannerType} do produto/container que deseja buscar.</p>
//                         </div>

//                         <Button
//                             type="button"
//                             onClick={() => handleScanner(false)}
//                             className="bg-transparent text-wise-hyper_black hover:bg-transparent hover:text-wise-dark_green"
//                             data-is-close-modal-element={true}
//                         >
//                             <X size={20}></X>
//                         </Button>
//                     </div>
//                     <div>
//                         {scannerType === "QRCode" ?
//                             <video className="rounded-sm" ref={videoElement} />
//                             :
//                             <div id="html5-barcode-reader" className="rounded-sm" />
//                         }
//                     </div>

//                     {!callAfterFound && <p>Resultado: {foundProduct ? foundProduct?.code : foundContainer ? foundContainer : null}</p>}
//                 </div>
//                 :
//                 null
//             }
//         </>
//     );
// }

// export { QRCodeScanner };



















// import QrScanner from "qr-scanner"
// import { BrowserMultiFormatReader } from "@zxing/browser"
// import { useContext, useRef, useState } from "react"
// import { Button } from "./ui/button"
// import { ScanBarcode, ScanQrCode, X } from "lucide-react"
// import clsx from "clsx"
// import { AuthContext } from "@/auth/AuthProvider"
// import { useQrScanner } from "@/context/ScannerContextProvider"

// function QRCodeScanner({buttonClassName = "", callAfterFound = null, disableAbsoluteModal=false, entity="product", scannerType = "QRCode"}) {
//     const { credentials } = useContext(AuthContext)
//     const videoElement = useRef(null)
//     const [result, setResult] = useState(null)
//     const [foundProduct, setFoundProduct] = useState(null)
//     const [foundContainer, setFoundContainer] = useState(null)
//     const [isScanning, setIsScanning] = useState(false)
//     const [scannerInstance, setScannerInstance] = useState(null)

//     const { qrScanner, setQrScanner, closeQrScanner } = useQrScanner()

//     async function stopScanner() {
//         if(scannerInstance) {
//             setIsScanning(false)
//             await scannerInstance.stop()
//             if(scannerType === "QRCode") {
//                 scannerInstance.destroy()
//             }
//             setScannerInstance(null)
//         }
//         document.body.style.overflow = 'unset';
//     }

//     async function handleScanner(toStart) {
//         setIsScanning(toStart)

//         if(!toStart && scannerInstance) {
//             await stopScanner()
//             return
//         }

//         document.body.style.overflow = 'hidden';

//         if(scannerType === "QRCode") {
//             const scanner = new QrScanner(videoElement.current, (scannResult) => {
//                 handleScanResult(scannResult.data)
//             }, {
//                 returnDetailedScanResult: true,
//                 highlightScanRegion: true,
//                 highlightCodeOutline: true,
//                 maxScansPerSecond: 1
//             })
//             scanner.setInversionMode("both")
//             scanner.start()

//             setScannerInstance(scanner)
//             setQrScanner(scanner)
//         } else {
//             const barcodeReader = new BrowserMultiFormatReader()
//             barcodeReader.decodeFromVideoDevice(null, videoElement.current, (result, err) => {
//                 if(result) {
//                     handleScanResult(result.getText())
//                 }
//             })
//             setScannerInstance(barcodeReader)
//             setQrScanner(barcodeReader)
//         }
//     }

//     function handleScanResult(foundCodeProduct) {
//         setResult(foundCodeProduct)

//         fetch(`${import.meta.env.VITE_API_BASE_URL}/${entity}?code=${foundCodeProduct.slice(1)}`, {
//             headers: {
//                 "Authorization": `Bearded ${credentials.token}`
//             }
//         }).then(json => json.json()).then(entityFound => {
//             if(entityFound.length > 0) {
//                 if(entity == "product") setFoundProduct(entityFound[0])
//                 if(entity == "virtualStock") setFoundContainer(entityFound[0])

//                 if(callAfterFound){
//                     callAfterFound(entityFound[0])

//                     if(!disableAbsoluteModal) {
//                         document.querySelector("div[data-is-close-modal-element=true]")?.click()
//                     }
//                     stopScanner()
//                 } 
//             }
//         })
//     }

//     function handleModal(ev) {
//         const elementEvent = ev.target
//         if (elementEvent.getAttribute("data-is-close-modal-element")) {
//             handleScanner(!isScanning)
//         }
//     }

//     return (
//         <>
//             {scannerType == "QRCode" ? 
//                 <Button 
//                     type="button"
//                     onClick={() => handleScanner(true)}
//                     className={clsx(buttonClassName, "flex items-center gap-2 bg-transparent text-wise-hyper_black p-0 hover:text-wise-light_white hover:p-2 transition-all")}
//                 >
//                     <ScanQrCode />
//                     Scanear QRCode
//                 </Button> 
//                 :
//                 <Button
//                     type="button"
//                     onClick={() => handleScanner(true)}
//                     className={clsx(buttonClassName, "flex items-center gap-2 bg-transparent text-wise-hyper_black p-0 hover:text-wise-light_white hover:p-2 transition-all")}
//                 >
//                     <ScanBarcode />
//                     Scanear código de barras
//                 </Button>
//             }

//             {!disableAbsoluteModal ?
//                 <div
//                     className={isScanning ? "absolute z-50 min-w-full min-h-full overflow-hidden bg-black/[.7] top-0 left-0 flex items-center justify-center" : "hidden"}
//                     onClick={handleModal}
//                     data-is-close-modal-element={true}
//                 >
//                     <div className="max-w-[600px] min-h-[350px] bg-wise-light_white p-6 overflow-auto rounded-md flex flex-col gap-3">
//                         <div className="flex justify-between flex-wrap gap-4 items-start">
//                             <div className="max-w-[70%]">
//                                 <h2 className="font-semibold">
//                                     Leitor de {scannerType}
//                                 </h2>
//                                 <p className="text-sm">Aponte a câmera do dispositivo para o {scannerType} do produto/container que deseja buscar.</p>
//                             </div>

//                             <Button 
//                                 type="button" 
//                                 onClick={() => handleScanner(false)}
//                                 className="bg-transparent text-wise-hyper_black hover:bg-transparent hover:text-wise-dark_green"
//                                 data-is-close-modal-element={true}
//                             >
//                                 <X size={20} />
//                             </Button>
//                         </div>
//                         <div>
//                             <video
//                                 className="rounded-sm"
//                                 ref={videoElement} 
//                             />
//                         </div>

//                         {!callAfterFound && <p>Resultado: {foundProduct && foundProduct?.code}</p>}
//                     </div>
//                 </div> :
//                 null
//             }

//             {disableAbsoluteModal ?
//                 <div className={!isScanning ? "hidden" : "w-full min-h-[350px] bg-wise-light_white p-6 overflow-auto rounded-md flex flex-col gap-3"}>
//                     <div className="flex justify-between flex-wrap gap-4 items-start">
//                         <div className="max-w-[70%]">
//                             <h2 className="font-semibold">Leitor de {scannerType}</h2>
//                             <p className="text-sm">Aponte a câmera do dispositivo para o {scannerType} do produto/container que deseja buscar.</p>
//                         </div>

//                         <Button 
//                             type="button" 
//                             onClick={() => handleScanner(false)}
//                             className="bg-transparent text-wise-hyper_black hover:bg-transparent hover:text-wise-dark_green"
//                             data-is-close-modal-element={true}
//                         >
//                             <X size={20} />
//                         </Button>
//                     </div>
//                     <div>
//                         <video
//                             className="rounded-sm"
//                             ref={videoElement} 
//                         />
//                     </div>

//                     {!callAfterFound && <p>Resultado: {foundProduct ? foundProduct?.code : foundContainer ? foundContainer : null}</p>}
//                 </div>
//                 :
//                 null
//             }
//         </>
//     )
// }

// export { QRCodeScanner }
