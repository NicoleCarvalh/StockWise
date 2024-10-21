import QrScanner from "qr-scanner"
import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "./ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Button } from "./ui/button"
import { ScanQrCode, X } from "lucide-react"


function QRCodeScanner({children}) {
    const videoElement = useRef(null)
    const [result, setResult] = useState(null)
    const [isScanning, setIsScanning] = useState(false)
    const [scannerInstance, setScannerInstance] = useState(null)

    function handleScanner(toStart) {
        setIsScanning(!isScanning)

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

        return scanner
    }

    return (
        <>
            <Button 
                onClick={handleScanner}
                className="flex items-center gap-2 bg-transparent text-wise-hyper_black p-0 hover:text-wise-light_white hover:p-2 transition-all"
            >
                <ScanQrCode />
                Scanear QRCode
            </Button>

            <div
                className={isScanning ? "absolute z-40 min-w-full min-h-full overflow-hidden bg-black/[.7] top-0 left-0 flex items-center justify-center" : "hidden"} 
            >
                <div className="max-w-[600px] min-h-[350px] bg-wise-light_white p-6 rounded-md flex flex-col gap-3">
                    <div className="flex justify-between flex-wrap gap-4 items-start">
                        <div className="max-w-[70%]">
                            <h2 className="font-semibold">Leitor de QRCode</h2>
                            <p className="text-sm">Aponte a câmera do dispositivo para o QRCode do produto que deseja buscar.</p>
                        </div>

                        <Button 
                            type="button" 
                            onClick={handleScanner}
                            className="bg-transparent text-wise-hyper_black hover:bg-transparent hover:text-wise-dark_green"
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