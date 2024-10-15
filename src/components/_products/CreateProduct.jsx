import { useState } from "react";
import { Input } from "../ui/input";
import QRCode from 'qrcode';

function CreateProduct() {
    const [qrCodeUrl, setQrCodeUrl] = useState("#");
    const [productId, setProductId] = useState("32RG-53D");

    function generateQRCode() {
        QRCode.toDataURL(productId, {
          width: 100,
          margin: 2,
          color: {
            dark: "#00cc74"
          }
        }, (err, url) => {
          if (err) {
            console.error(err);
            // Exibir uma mensagem de erro ao usuário
          } else {
            setQrCodeUrl(url);
          }
        });
    }

    return (
        <form action="">
            <div>
                <label htmlFor="name">
                    Nome
                </label>

                <Input id="name" />
            </div>

            <div>
                <label htmlFor="description">
                    Descrição
                </label>

                <Input id="description" />
            </div>

            <div>
                <button type="button" onClick={() => generateQRCode()}>Gerar</button>
                <img id="qrcode" alt="QR Code" src={qrCodeUrl} className="rounded-md" />
            </div>
        </form>
    );
}

export { CreateProduct };