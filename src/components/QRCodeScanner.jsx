import QrScanner from "qr-scanner"
import { useRef, useState } from "react"
import { Button } from "./ui/button"
import { ScanQrCode, X } from "lucide-react"

function QRCodeScanner() {
    const videoElement = useRef(null)
    const [result, setResult] = useState(null)
    const [isScanning, setIsScanning] = useState(false)
    const [scannerInstance, setScannerInstance] = useState(null)

    function handleScanner(toStart) {
        setIsScanning(toStart)

        if(!toStart && scannerInstance) {
            scannerInstance.stop()
            scannerInstance.destroy()

            setScannerInstance(null)

            document.body.style.overflow = 'unset';
            
            return
        }

        document.body.style.overflow = 'hidden';

        const scanner = new QrScanner(videoElement.current, (scannResult) => {
            console.log(scannResult)
            setResult(scannResult.data)
        },
        {
            returnDetailedScanResult: true,
            highlightScanRegion: true,
            highlightCodeOutline: true
        })
        scanner.setInversionMode("both")
        scanner.start()

        setScannerInstance(scanner)
    }

    function handleModal(ev) {
        const elementEvent = ev.target
        
        elementEvent.getAttribute("data-is-close-modal-element") && handleScanner(!isScanning)
    }

    return (
        <>
            <Button 
                onClick={() => handleScanner(true)}
                className="flex items-center gap-2 bg-transparent text-wise-hyper_black p-0 hover:text-wise-light_white hover:p-2 transition-all"
            >
                <ScanQrCode />
                Scanear QRCode
            </Button>

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

                    <p>Resultado: {result}</p>
                </div>
            </div>
            
        </>
    )
}

export { QRCodeScanner }