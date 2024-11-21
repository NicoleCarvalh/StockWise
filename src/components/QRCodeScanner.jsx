import QrScanner from "qr-scanner"
import { useContext, useRef, useState } from "react"
import { Button } from "./ui/button"
import { ScanQrCode, X } from "lucide-react"
import clsx from "clsx"
import { AuthContext } from "@/auth/AuthProvider"
import { useQrScanner } from "@/context/ScannerContextProvider"

function QRCodeScanner({buttonClassName = "", callAfterFound = null, disableAbsoluteModal=false}) {
    const { credentials } = useContext(AuthContext)
    const videoElement = useRef(null)
    const [result, setResult] = useState(null)
    const [foundProduct, setFoundProduct] = useState(null)
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

            fetch(`${import.meta.env.VITE_API_BASE_URL}/product?code=${foundCodeProduct.slice(1)}`, {
                headers: {
                "Authorization": `Bearded ${credentials.token}`
                }
            }).then(json => json.json()).then(product => {
                if(product.length > 0) {
                    setFoundProduct(product[0])

                    if(callAfterFound){
                        callAfterFound(product[0])

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
            <Button 
                type="button"
                onClick={() => handleScanner(true)}
                className={clsx(buttonClassName, "flex items-center gap-2 bg-transparent text-wise-hyper_black p-0 hover:text-wise-light_white hover:p-2 transition-all")}
            >
                <ScanQrCode />
                Scanear QRCode
            </Button>

            {!disableAbsoluteModal ?
                <div
                    className={isScanning ? "absolute z-50 min-w-full min-h-full overflow-hidden bg-black/[.7] top-0 left-0 flex items-center justify-center" : "hidden"}

                    onClick={handleModal}
                    data-is-close-modal-element={true}
                >
                    <div className="max-w-[600px] min-h-[350px] bg-wise-light_white p-6 overflow-auto rounded-md flex flex-col gap-3">
                        <div className="flex justify-between flex-wrap gap-4 items-start">
                            <div className="max-w-[70%]">
                                <h2 className="font-semibold">Leitor de QRCode</h2>
                                <p className="text-sm">Aponte a câmera do dispositivo para o QRCode do produto que deseja buscar.</p>
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
                            <h2 className="font-semibold">Leitor de QRCode</h2>
                            <p className="text-sm">Aponte a câmera do dispositivo para o QRCode do produto que deseja buscar.</p>
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
                :
                null
            }
        </>
    )
}

export { QRCodeScanner }