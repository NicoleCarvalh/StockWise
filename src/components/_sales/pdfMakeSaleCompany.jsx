import pdfMake from "pdfmake/build/pdfmake"
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

async function CreateSalePDFCompany({title, generatedAt, client, clientEmail, paymentMethod, total, orders}) {
    // const mostSoldProduct = products.reduce((bigger, current) => current.)
    const productsList = orders.map(order => {
        return [
            {text: order?.product?.name ?? "Produto"},
            {text: order?.quantity ?? "--"},
            {text: order?.product?.salePrice ?? "--"},
            {text: (order?.product?.salePrice && order?.quantity) ? order?.product?.salePrice * order?.quantity : "--"},
        ]
    })

    const details = [
        {
			text: title,
			style: 'header'
		},
        {
            text: [
                {
                    text: 'Data da venda: ',
                    bold: true
                },
                `${generatedAt}`
            ]
        },
        {
            text: "Resumo da venda",
            fontSize: 25,
            margin: [0, 25, 0, 15]
        },
        {
            // text: [
            //     {
            //         text: 'Total de produtos em sistema: ',
            //         bold: true
            //     },
            //     `${products.length}`
            // ]

            text: [
                {
                    text: 'Cliente que realizou a compra: ',
                    bold: true
                },
                `${client}`
            ]
        },
        {
            text: [
                {
                    text: 'E-mail do cliente: ',
                    bold: true
                },
                `${clientEmail}`
            ]
        },
        {
            text: [
                {
                    text: 'A compra foi efetuada na modalidae: ',
                    bold: true
                },
                `${paymentMethod}`
            ]
        },
        {
            text: [
                {
                    text: 'Valor total da compra: ',
                    bold: true
                },
                `R$ ${total} reais`
            ]
        },

        // Produtos

        {
            text: "Produtos",
            fontSize: 25,
            margin: [0, 25, 0, 15]
        },

        {
			style: 'table',
			table: {
				body: [
					['Produto', 'Quantidade', 'R$ unidade', 'Total'],
					// ['One value goes here', 'XX', 'Another one here', 'OK?']
                    ...productsList
				]
			}
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
            },
            table: {
                margin: [0, 5, 0, 15]
            }
        },
        defaultStyle: {
            fontSize: 18
        }
    }

    const file = await generateFile(docConfigs, generatedAt);
    console.log('File gerado:', file);
    return file;
}

export { CreateSalePDFCompany }
