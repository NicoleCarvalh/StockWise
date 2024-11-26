import pdfMake from "pdfmake/build/pdfmake"
// import pdfFonts from "pdfmake/build/vfs_fonts"
import "pdfmake/build/vfs_fonts";
import Chart from "chart.js/auto";

function generateFile(docConfigs, fileName) {
    return new Promise((resolve, reject) => {
        pdfMake.createPdf(docConfigs).download(`${fileName}.pdf`)
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

function getMostSoldOrPurchasedProduct(listOfSaleOrPurchase) {    
    // Objeto para armazenar a soma de vendas por produto
    const productsCount = {};
    
    // Iterar por cada venda
    listOfSaleOrPurchase.forEach(sale => {
        // Fazer o JSON parse do campo orders
        const orders = JSON.parse(sale.orders);
    
        // Iterar por cada ordem dentro do campo orders
        orders.forEach(order => {
            const product = order.product;
            const quantity = order.quantity;
    
            // Incrementar o contador de vendas para o produto
            if (!productsCount[product.id]) {
                productsCount[product.id] = {
                    ...product,
                    totalSold: 0,
                };
            }
            productsCount[product.id].totalSold += quantity;
        });
    });
    
    // Determinar o produto mais vendido
    // const mostSoldOrPurchasedProduct = Object.values(productsCount).reduce((max, product) => {
    //     return product.totalSold > max.totalSold ? product : max;
    // }, { totalSold: 0 });
    
    
    const sortedProducts = Object.values(productsCount).sort((a, b) => b.totalSold - a.totalSold);
    console.log(sortedProducts);

    return {sortedProducts, productsCount}
}

async function generateChartBase64(data) {
    return new Promise((resolve, reject) => {
        // Criação de canvas invisível
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 400;

        // Gera o gráfico com Chart.js
        new Chart(canvas, {
            type: "bar", // Tipo de gráfico
            data: {
                labels: data.labels, // Labels para os eixos
                datasets: [
                    {
                        label: "Vendas",
                        data: data.values, // Valores dos dados
                        backgroundColor: "rgba(0, 204, 116, 0.2)",
                        borderColor: "rgba(0, 204, 116, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: false,
            },
        });

        // Aguarda renderização do gráfico
        setTimeout(() => {
            try {
                const base64Image = canvas.toDataURL("image/png");
                resolve(base64Image);
            } catch (error) {
                reject(new Error("Erro ao gerar o gráfico"));
            }
        }, 1000);
    });
}

async function CreateReportPDFMake({title, generatedAt, products, sales, purchases, period, fileName, subTitle, company, virtualStocks, clients}) {


    const mostSoldProductObject = getMostSoldOrPurchasedProduct(sales)
    const mostPurchasedProductObject = getMostSoldOrPurchasedProduct(purchases)

    const mostSoldProduct = mostSoldProductObject.sortedProducts[0]
    const mostPurchasedProduct = mostPurchasedProductObject.sortedProducts[0]

    console.log("MostSold")
    console.log(mostSoldProductObject)
    console.log("MostPurch")
    console.log(mostPurchasedProductObject)

    const mostSoldProductSortedNamesList = mostSoldProductObject.sortedProducts.slice(0, 5).map(sold => `${sold?.code} |  ${sold?.name}`)
   
    let bestProductCategories = {
        labels:  mostSoldProductObject.sortedProducts.slice(0, 5).map(sold => sold?.code),
        values:  mostSoldProductObject.sortedProducts.slice(0, 5).map(sold => Number(sold?.totalSold)),
    };

    // Gera a URL Base64 do gráfico
    const bestProductCategoriesGraph = await generateChartBase64(bestProductCategories);

    console.log(period)
    console.log(fileName)
    console.log(purchases)
    console.log(products)
    console.log(sales)
    console.log(title)
    console.log(subTitle)
    console.log(company)
    console.log(virtualStocks)
    console.log(clients)


    // const mostSoldProduct = products.reduce((bigger, current) => current.)
    const details = [
        {
			text: title,
			style: 'header'
		},
        {
            text: subTitle,
            style: 'subtitle'
        },
        {
            text: [
                {
                    text: 'Gerado em: ',
                    bold: true
                },
                `${generatedAt}`
            ],
            fontSize: 13
        },
        {
            text: [
                {
                    text: 'Período selecionado: ',
                    bold: true
                },
                `${period}`
            ],
            fontSize: 13
        },

        // Abstract
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
                `${mostSoldProduct?.name} | Total de ${mostSoldProduct?.totalSold} vendidos`
            ]
        },
        {
            text: [
                {
                    text: 'Produto mais comprado: ',
                    bold: true
                },
                mostPurchasedProduct?.name ? `${mostPurchasedProduct?.name} | Total de ${mostPurchasedProduct?.totalSold} comprados para reposição` : 'Não foram encontradas compras para serem analisadas.'
            ]
        },

        // Products
        {
            text: "Produtos",
            fontSize: 25,
            margin: [0, 25, 0, 15]
        },
        {
            image: bestProductCategoriesGraph, // Insere o gráfico no PDF
            width: 500,
            alignment: "center",
        },
        {
            text: `No gráfico acima é mostrado os 5 produtos que mais foram vendidos dentre todas as vendas da empresa! Nele foram separados os códigos dos produtos, que correspondem aos produtos a baixo:`,
            margin: [0, 5, 0, 15]
        },

        {
            text: "No gráfico acima é mostrado os 5 produtos que mais foram vendidos dentre todas as vendas da empresa!",
            margin: [0, 5, 0, 10]
        },
        {text: 'Nele foram separados os códigos dos produtos, que correspondem aos produtos a baixo:'},
		{
			ul: mostSoldProductSortedNamesList
		},

        // Sales
        {
            text: "Vendas",
            fontSize: 25,
            margin: [0, 25, 0, 15]
        },

        // Clients
        {
            text: "Clientes cadastrados no sistema",
            fontSize: 20,
            margin: [15, 25, 0, 15]
        },


        // Sales
        {
            text: "Reposições de estoque (compras)",
            fontSize: 25,
            margin: [0, 25, 0, 15]
        },


        // VirtualStock
        {
            text: "Estoque virtual",
            fontSize: 25,
            margin: [0, 25, 0, 15]
        },
    ]

    const footer = []

    const docConfigs = {
        pageSize: 'A4',
        pageMargins: [25, 50, 25, 40],

        header: [
            {
                text: `${company?.name?.split(" ")[0] ?? "Empresa"} | Relatório geral ${period} - gerado em ${generatedAt}`,
                margin: [25, 10, 15, 0],
                fontSize: 12
            }
        ],
        content: details,
        footer: footer,

        styles: {
            header:{
                bold: true,
                fontSize: 30
            },
            subtitle:{
                fontSize: 20,
                margin: [0, 0, 0, 10]
            },
        },
        defaultStyle: {
            fontSize: 15
        }
    }

    // pdfMake.createPdf(docConfigs).download()


    // let file;

    // pdfMake.createPdf(docConfigs).getBlob((blob) => {
    //     file = new File([blob], `${period}.pdf`, { type: "application/pdf" });
    // })

    // console.log("Blob aqui")
    // console.log(file)


    const file = await generateFile(docConfigs, fileName);
    console.log('File gerado:', file);
    return file;
}

export { CreateReportPDFMake }
