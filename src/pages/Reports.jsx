import { MainContainer } from "@/components/MainContainer";
import { TopMenu } from "@/components/TopMenu";
import { Button } from "@/components/ui/button";
import {
  ArrowUpNarrowWide,
  FileChartColumn,
  FilePlus2,
  Filter,
} from "lucide-react";
import { ReportTemplate } from "@/components/_reports/Template";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateReport } from "@/components/_reports/CreateReport";
import { useRef } from "react"

function Reports() {
  const createReportModalRef = useRef()

  return (
    <>
      <TopMenu />

      <MainContainer className="flex flex-col gap-8">
        <section className="flex gap-3 justify-between items-center flex-wrap montserrat">
          <h1 className="text-2xl font-bold">Relatórios</h1>

          <div className="flex gap-4 flex-wrap justify-center">
            <Button className="flex items-center gap-2 bg-transparent text-wise-hyper_black p-0 hover:text-wise-light_white hover:p-2 transition-all">
              <Filter />
              Filtrar
            </Button>

            <Button className="flex items-center gap-2 bg-transparent text-wise-hyper_black p-0 hover:text-wise-light_white hover:p-2 transition-all">
              <ArrowUpNarrowWide />
              Ordenar
            </Button>

            <Dialog>
              <DialogTrigger asChild ref={createReportModalRef}>
                <Button className="flex-1 flex gap-3 items-center bg-wise-hyper_black text-wise-hyper_light_green h-[40px] hover:bg-wise-hyper_black hover:text-wise-light_white transition-all">
                  <FilePlus2 />
                  Criar novo relatório
                </Button>
              </DialogTrigger>

              <DialogContent className="montserrat overflow-x-hidden max-w-[90%] md:max-w-[40%]">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold border-b-2 border-wise-dark_green py-3">
                    Criação de relatórios
                  </DialogTitle>

                  <DialogDescription>
                    Selecione o período que deseja criar o relatório para
                    dominar tudo sobre o seu estoque!
                  </DialogDescription>
                </DialogHeader>

                <CreateReport closeCurrentModal={() => createReportModalRef.current.click()} />
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <section className="flex flex-col gap-2 montserrat">
          <h1 className="text-xl font-semibold">Recentes</h1>

          <div className="flex gap-4 flex-wrap items-center">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex-1 min-w-[250px] p-2 pr-8 bg-wise-hyper_white flex gap-3 flex-wrap rounded-md min-h-[80px] cursor-pointer"
              >
                <div className="min-h-full flex items-center p-4 rounded-sm text-wise-dark_green">
                  <FileChartColumn size={30} />
                </div>

                <div className="flex flex-col justify-between gap-3 min-h-full">
                  <h3 className="text-lg">08/02/2024</h3>

                  <div className="w-full flex gap-4 justify-between font-light">
                    <p>7 páginas</p>

                    <p>8 MG</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2 montserrat">
          <h1 className="text-xl font-semibold">Todos</h1>

          <div className="flex gap-4 flex-wrap items-center">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="flex-1 min-w-[250px] p-2 pr-8 bg-wise-hyper_white flex gap-3 flex-wrap rounded-md min-h-[80px] cursor-pointer"
              >
                <div className="min-h-full flex items-center p-4 rounded-sm text-wise-dark_green">
                  <FileChartColumn size={30} />
                </div>

                <div className="flex flex-col justify-between gap-3 min-h-full">
                  <h3 className="text-lg">08/02/2024</h3>

                  <div className="w-full flex gap-4 justify-between font-light">
                    <p>7 páginas</p>

                    <p>8 MG</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </MainContainer>
    </>
  );
}

export { Reports };