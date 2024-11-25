import pdfMake from "pdfmake/build/pdfmake"
// import pdfFonts from "pdfmake/build/vfs_fonts"
import "pdfmake/build/vfs_fonts";

function generateFile(docConfigs, fileName) {
    return new Promise((resolve, reject) => {
        pdfMake.createPdf(docConfigs).download()
        pdfMake.createPdf(docConfigs).getBlob(async (blob) => {
            if (blob) {
                const file = new File([blob], `${fileName}.pdf`, { type: "application/pdf" });

                const arrBuffer = await blob.arrayBuffer()

                file.buffer = new Uint8Array(arrBuffer);
            
                resolve(file);
            } else {
            reject(new Error("Erro ao gerar Blob para o arquivo PDF"));
            }
        });
    });
  }

async function CreateReportPDFMake({title, generatedAt, products, sales, purchases, period, formattedPeriod}) {
    // const mostSoldProduct = products.reduce((bigger, current) => current.)
    const details = [
        {
			text: title,
			style: 'header'
		},
        {
            text: [
                {
                    text: 'Gerado em: ',
                    bold: true
                },
                `${generatedAt}`
            ]
        },
        {
            text: [
                {
                    text: 'Periodo selecionado: ',
                    bold: true
                },
                `${formattedPeriod}`
            ]
        },
        {
            text: "Resumo geral",
            fontSize: 25,
            margin: [0, 25, 0, 15]
        },
        {
            text: [
                {
                    text: 'Total de produtos em sistema: ',
                    bold: true
                },
                `${products.length}`
            ]
        },
        {
            text: [
                {
                    text: 'Total de vendas cadastradas: ',
                    bold: true
                },
                `${sales.length}`
            ]
        },
        {
            text: [
                {
                    text: 'Total de compras realizadas: ',
                    bold: true
                },
                `${purchases.length}`
            ]
        },
        {
            text: [
                {
                    text: 'Produto mais vendido: ',
                    bold: true
                },
                `xxx`
            ]
        },

        // Produtos

        {
            text: "Produtos",
            fontSize: 25,
            margin: [0, 25, 0, 15]
        },


        // Tabela 
        // {
        //     text: [
        //         {
        //             text: 'Total de produtos em sistema: ',
        //             bold: true
        //         },
        //         `${products.length}`
        //     ]
        // },
        // {
        //     text: [
        //         {
        //             text: 'Produto mais vendido: ',
        //             bold: true
        //         },
        //         `xxx`
        //     ]
        // },
    ]

    const footer = []

    const docConfigs = {
        pageSize: 'A4',
        pageMargins: [25, 50, 25, 40],

        // header: title,
        content: details,
        footer: footer,

        styles: {
            header:{
                bold: true,
                fontSize: 30
            }
        },
        defaultStyle: {
            fontSize: 18
        }
    }

    // pdfMake.createPdf(docConfigs).download()


    // let file;

    // pdfMake.createPdf(docConfigs).getBlob((blob) => {
    //     file = new File([blob], `${period}.pdf`, { type: "application/pdf" });
    // })

    // console.log("Blob aqui")
    // console.log(file)


    const file = await generateFile(docConfigs, period);
    console.log('File gerado:', file);
    return file;
}

export { CreateReportPDFMake }
