// "use client"

// import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"
// import { useContext, useEffect } from "react"
// import { SalesContext } from "@/context/SalesContextProvider"


// // const chartData = [
// //   { month: "January", count: 186, mobile: 80 },
// //   { month: "February", count: 305, mobile: 200 },
// //   { month: "March", count: 237, mobile: 120 },
// //   { month: "April", count: 73, mobile: 190 },
// //   { month: "May", count: 209, mobile: 130 },
// //   { month: "June", count: 214, mobile: 140 },
// // ]

// const chartConfig = {
//   count: {
//     label: "Count",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
//   label: {
//     color: "hsl(var(--background))",
//   },
// }

// const chartData = [
//   {month: 'Janeiro', count: 124},
//   {month: 'Fevereiro', count: 180},
//   {month: 'Março', count: 170},
//   {month: 'Abril', count: 114},
//   {month: 'Maio', count: 164},
//   {month: 'Junho', count: 94},
//   {month: 'Julho', count: 74},
//   {month: 'Agosto', count: 143},
//   {month: 'Setembro', count: 134},
//   {month: 'Outubro', count: 174},
//   {month: 'Novembro', count: 0},
//   // {month: 'Dezembro', count: 0}
// ]

// function BarChartCard() {
//   const { sales, refreshSales } = useContext(SalesContext)

//   useEffect(() => {
//     refreshSales()

//     // sales.forEach(sale => {
//     //   const saleMonth = new Date(sale.createdAt).getMonth() + 1
      
//     //   chartData[saleMonth - 1].count = 0
//     // })
//   }, [])

//   useEffect(() => {
//     let totalSold = 0

//     sales.forEach(sale => {
//       totalSold += sale.total
      
//       console.log("totalSold")
//       console.log(totalSold)

//       const saleMonth = new Date(sale.createdAt).getMonth() + 1
//       // const monthName = monthNames[saleMonth - 1].month
//       // console.log("saleMonth")
//       // console.log(saleMonth)
//       // console.log("saleMonth - 1")
//       // console.log(saleMonth - 1)

//       chartData[saleMonth - 1].count += totalSold
//     })

//     console.log("chartData")
//     console.log(chartData)
//   }, [sales])

//   return (
//     <Card className="flex-1">
//       <CardHeader>
//         <CardTitle>Vendas por mês</CardTitle>
//         <CardDescription>Quantidade de vendas realizadas por mês</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart
//             accessibilityLayer
//             data={chartData}
//             layout="vertical"
//             margin={{
//               right: 50,

//             }}
//           >
//             <CartesianGrid horizontal={false} />
//             <YAxis
//               dataKey="month"
//               type="category"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 3)}
//               hide
//             />
//             <XAxis dataKey="count" type="number" hide />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="line" />}
//             />
//             <Bar
//               dataKey="count"
//               layout="vertical"
//               fill="var(--color-count)"
//               radius={4}
//               barSize={40}
//             >
//               <LabelList
//                 dataKey="month"
//                 position="insideLeft"
//                 offset={8}
//                 className="fill-[--color-label]"
//                 fontSize={15}
//               />
//               <LabelList
//                 dataKey="count"
//                 position="right"
//                 offset={8}
//                 className="fill-foreground"
//                 fontSize={15}
//               />
//             </Bar>
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }

// export { BarChartCard }




"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { useContext, useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { SalesContext } from "@/context/SalesContextProvider"

// Configuração inicial do gráfico
const initialChartData = [
  { month: "Janeiro", count: 1024 },
  { month: "Fevereiro", count: 1280 },
  { month: "Março", count: 1790 },
  { month: "Abril", count: 1144 },
  { month: "Maio", count: 1164 },
  { month: "Junho", count: 924 },
  { month: "Julho", count: 874 },
  { month: "Agosto", count: 1143 },
  { month: "Setembro", count: 1134 },
  { month: "Outubro", count: 1074 },
  { month: "Novembro", count: 0 },
  // { month: "Dezembro", count: 15 },
]

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
}

function BarChartCard() {
  const { sales, refreshSales } = useContext(SalesContext)
  const [chartData, setChartData] = useState(initialChartData)

  useEffect(() => {
    refreshSales()
  }, [])

  useEffect(() => {
    // Reinicializa os dados do gráfico
    const resetChartData = initialChartData.map((item) => ({
      count: 0,
      ...item,
    }))

    // Calcula as vendas por mês
    sales.forEach((sale) => {
      const saleMonth = new Date(sale.createdAt).getMonth() // Índice do mês (0-11)
      resetChartData[saleMonth].count += sale.total // Incrementa a contagem no mês correspondente
    })

    setChartData(resetChartData) // Atualiza o estado com os novos dados
  }, [sales])

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Vendas por mês</CardTitle>
        <CardDescription>Quantidade de vendas realizadas por mês</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 50,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="count"
              layout="vertical"
              fill="var(--color-count)"
              radius={4}
              barSize={40}
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={15}
              />
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={15}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export { BarChartCard }
