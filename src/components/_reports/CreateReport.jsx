import { useContext, useRef, useState } from "react";
import { ReportTemplate } from "@/components/_reports/Template";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { AuthContext } from "@/auth/AuthProvider";
import { CreateReportPDFMake } from "./pdfMakeReport";
import { ProductsContext } from "@/context/ProductsContextProvider";
import { SalesContext } from "@/context/SalesContextProvider";
import { PurchasesContext } from "@/context/PurchasesContextProvider";
import { ClientContext } from "@/context/ClientsContextProvider";
import { VirtualStockContext } from "@/context/VirtualStockContextProvider";

function CreateReport({ closeCurrentModal }) {
  const { credentials } = useContext(AuthContext)
  const { products } = useContext(ProductsContext)
  const { sales } = useContext(SalesContext)
  const { purchase } = useContext(PurchasesContext)
  const { clients } = useContext(ClientContext)
  const { virtualStocks } = useContext(VirtualStockContext)


  const containerToPrintRef = useRef(null);
  const [title, setTitle] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [period, setPeriod] = useState("");

  const { toast } = useToast();

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

    if (initialDataFormatted >= finalDataFormatted) {
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

    const LocaleDateOfInitialDate = initialDataFormatted.toLocaleDateString()
    const LocaleDateOfFinalDate = finalDataFormatted.toLocaleDateString()
    const period = `De ${LocaleDateOfInitialDate} até ${LocaleDateOfFinalDate}`

    setPeriod(period)

    const file = await CreateReportPDFMake(
      {
        title: `Relatório geral do StockWise - ${new Date().getFullYear()}`, 
        subTitle: title,
        company: credentials?.companyData,
        fileName: `relatorio_${LocaleDateOfInitialDate}_${LocaleDateOfFinalDate}`, 
        period: period.toLowerCase(), 
        generatedAt: new Date().toLocaleString(),
        purchases: purchase,
        products,
        sales,
        clients,
        virtualStocks
      }
    )

    const formData = new FormData();
    formData.append("file", file);
    formData.append("period", period);

    fetch(`${import.meta.env.VITE_API_BASE_URL}/report`, {
      method: "POST",
      headers: {
        "Authorization": `Bearded ${credentials.token}`
      },
      body: formData,
    })
    .then((response) => {
      return response.json()
    })
    .then(data => {
      if(data?.ERROR) {
        toast({
            title: "Ocorreu um erro durante a operação!",
            variant: "destructive",
            description: <p>{data?.ERROR} <br/>Tente novamente</p>,
            action: (
              <ToastAction altText="Fechar">Fechar</ToastAction>
            )
        })

        return
      }

      toast({
        title: "Cópia do relatório salvo!",
        description: (
          <p>
            Acesse a cópia do relatório salva no sistema a qualquer momento.
          </p>
        ),
        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
      });
    })
    .catch((error) => console.error(error));

    closeCurrentModal && closeCurrentModal();

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
