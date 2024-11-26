// "use client"

// import { TrendingUp } from "lucide-react"
// import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

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
// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 273 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
// }

// function RadarChartCard() {
//   return (
//     <Card className="flex-1">
//       <CardHeader className="items-center">
//         <CardTitle>Produtos mais vendidos no mês</CardTitle>
//         <CardDescription>
//           Os 5 produtos que mais saíram esse mês
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <RadarChart data={chartData}>
//             <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
//             <PolarAngleAxis dataKey="month" />
//             <PolarGrid />
//             <Radar
//               dataKey="desktop"
//               fill="var(--color-desktop)"
//               fillOpacity={0.6}
//               dot={{
//                 r: 4,
//                 fillOpacity: 1,
//               }}
//             />
//           </RadarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }

// export { RadarChartCard }



"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { SalesContext } from "@/context/SalesContextProvider"
import { useContext, useEffect, useState } from "react"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  
}

function RadarChartCard() {
  const [chartData, setChartData] = useState([
    { category: "Nenhuma", count: 0 },
    { category: "Nenhuma", count: 0 },
    { category: "Nenhuma", count: 0 },
  ])
  const { sales } = useContext(SalesContext)

  function countSalesByCategory(receivedSales) {
    const categoryCount = {}

    receivedSales.forEach((sale) => {
      const categories = sale.products.map((product) => product.category)
      const uniqueCategories = new Set(categories)

      uniqueCategories.forEach((category) => {
        if (!categoryCount[category]) {
          categoryCount[category] = 0
        }
        categoryCount[category]++
      })
    })

    return Object.entries(categoryCount).map(([category, count]) => ({
      category: category.toLowerCase(),
      count,
    }))
  }

  useEffect(() => {
    const cleanSales = sales.filter((sale) => {
      const currentDay = new Date().getDate()
      const saleDay = new Date(sale?.createdAt).getDate()
      return currentDay === saleDay
    })

    const salesByCategory = countSalesByCategory(cleanSales)

    salesByCategory.length > 0 && setChartData(salesByCategory)
  }, [sales])

  return (
    <Card className="flex-1">
      <CardHeader className="items-center">
        <CardTitle>Produtos vendidos por categoria</CardTitle>
        <CardDescription>Total de vendas por categoria hoje</CardDescription>
      </CardHeader>

      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData} outerRadius={90}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="category" />
            <PolarGrid />
            <Radar
              dataKey="count"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.6}
              dot={{ r: 4, fillOpacity: 1 }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export { RadarChartCard }
