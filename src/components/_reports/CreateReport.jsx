import { useRef, useState } from "react";
import { ReportTemplate } from "@/components/_reports/Template";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Buffer } from "@react-frontend-developer/buffers";

function CreateReport({ closeCurrentModal }) {
  const containerToPrintRef = useRef(null);
  const [title, setTitle] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const { toast } = useToast();

  async function handleDownloadPDF(fileName) {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
    });
  
    // Utilizamos uma promessa para lidar com a callback
    const blob = await new Promise((resolve) => {
      doc.html(containerToPrintRef.current, {
        callback: (doc) => {
          const file = `${fileName}.pdf`;
  
          doc.save(file); // Baixa o arquivo no dispositivo do usuário
          resolve(doc.output("blob")); // Retorna o blob
        },
      });
    });
  
    // Converte o Blob para um File
    const file = new File([blob], `${fileName}.pdf`, { type: "application/pdf" });
  
    // Extrai o buffer do arquivo
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log("arrayBuffer");

    console.log(Buffer.from(arrayBuffer));
    console.log("buffer");
    console.log(Buffer.from(buffer));
  
    // Adiciona o buffer como um atributo personalizado ao objeto File
    file.buffer = buffer;
  
    console.log("fileData 1", file);
  
    return file;
  }
  

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!containerToPrintRef.current) {
      toast({
        title: "Ocorreu um erro durante o download do relatório!",
        variant: "destructive",
        description: <p>Por favor, tente novamente mais tarde.</p>,
        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
      });

      return;
    }

    const initialDataFormatted = new Date(initialDate);
    const finalDataFormatted = new Date(finalDate);

    if (
      initialDataFormatted >= finalDataFormatted
    ) {
      toast({
        title: "Atenção às datas do período selecionado!",
        variant: "destructive",
        description: (
          <p>
            Você selecionou datas convergentes! Certifique-se de que a data de
            inicio não é maior ou igual que a final.
          </p>
        ),
        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
      });

      return;
    }

    const file = await handleDownloadPDF();

    console.log("file 3 ")
    console.log(file)

    const LocaleDateOfInitialDate = initialDataFormatted.toLocaleDateString()
    const LocaleDateOfFinalDate = finalDataFormatted.toLocaleDateString()

    const formData = new FormData();
    formData.append("file", file);
    formData.append("period", `De: ${LocaleDateOfInitialDate} até ${LocaleDateOfFinalDate}`);

    console.log(formData)
    console.log(file)
    console.log(`De: ${LocaleDateOfInitialDate} até ${LocaleDateOfFinalDate}`)

    // fetch("/api/upload", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => {
    //     if (!response.ok) throw new Error("Erro ao enviar o arquivo");
    //     console.log("Arquivo enviado com sucesso!");
    //   })
    //   .catch((error) => console.error(error));

    // closeCurrentModal && closeCurrentModal();

    toast({
      title: "O relatório em processamento.",
      description: (
        <p>
          O seu relatório já foi gerado e salvo na pasta downloads do seu
          dispositivo. Estamos salvando uma cópia e logo deixaremos disponível
          aqui no sistema!
        </p>
      ),
      action: <ToastAction altText="Fechar">Fechar</ToastAction>,
    });
  };

  return (
    <>
      <div className="hidden">
        <ReportTemplate ref={containerToPrintRef} title={title} />
      </div>

      <form
        className="flex flex-col gap-4"
        action=""
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Nome do relatório</Label>

          <Input
            type="text"
            id="title"
            required
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="Digite aqui..."
          />
        </div>

        <div className="flex flex-col flex-1 gap-3">
          <h2 className="text-lg font-medium">Período que deseja analisar</h2>

          <div className="flex flex-1 items-center justify-between gap-2 flex-wrap">
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="initialDate">De</Label>

              <Input
                type="date"
                id="initialDate"
                required
                value={initialDate}
                onChange={(ev) => setInitialDate(ev.target.value)}
                placeholder="Digite aqui..."
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="finalDate">Até</Label>

              <Input
                type="date"
                id="finalDate"
                required
                value={finalDate}
                onChange={(ev) => setFinalDate(ev.target.value)}
                placeholder="Digite aqui..."
              />
            </div>
          </div>
        </div>

        <Button className="flex-1" type="submit">
          Gerar relatório
        </Button>
      </form>
    </>
  );
}

export { CreateReport };
