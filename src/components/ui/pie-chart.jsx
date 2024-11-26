"use client"

import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { SalesContext } from "@/context/SalesContextProvider"
import { useContext, useEffect, useMemo, useState } from "react"
// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 190, fill: "var(--color-other)" },
// ]

// const colors = ["var(--color-chrome)", "var(--color-safari)", "var(--color-firefox)", "var(--color-edge)", "var(--color-other)"]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} 

function PieChartCard() {
  const [totalSold, setTotalSold] = useState(0)
  const { sales, refreshSales } = useContext(SalesContext)
  const [chartData, setChartData] = useState([{ browser: "Nenhuma", visitors: 1, fill: "var(--color-chrome)" }])

  // const totalVisitors = useMemo(() => {
  //   return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  // }, [])

  function countSalesByCategory(receivedSales) {
    const categoryCount = {};
  
    receivedSales.forEach((sale) => {
      // Extraímos as categorias de cada venda
      const categories = sale.products.map((product) => product.category);
  
      // Garantimos que cada categoria única dentro dessa venda seja contada uma vez
      const uniqueCategories = new Set(categories);
  
      uniqueCategories.forEach((category) => {
        if (!categoryCount[category]) {
          categoryCount[category] = 0;
        }
        categoryCount[category]++;
      });
    });
  
    // Transformamos o objeto em um array no formato solicitado
    const result = Object.entries(categoryCount).map(([category, count]) => ({
      browser: category.toLowerCase(),
      visitors: count,
      fill: ["var(--color-chrome)", "var(--color-safari)", "var(--color-firefox)", "var(--color-edge)", "var(--color-other)"][Math.floor(Math.random() * 5)]
    }));
  
    return result;
  }
  
  useEffect(() => {
    const cleanSales = sales.filter((sale) => {
      const currentDay = new Date().getDate()
      const saleDay = new Date(sale?.createdAt).getDate()
      return currentDay == saleDay
    })

    const salesByCategory = countSalesByCategory(cleanSales)

    let sum = 0;
    salesByCategory.forEach(cleanSale => {
      sum += cleanSale.visitors
    })
    setTotalSold(sum)

    salesByCategory.length > 0 && setChartData(salesByCategory)
  }, [sales])

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Produtos vendidos no dia</CardTitle>
        <CardDescription>Total de pedidos vendidos hoje</CardDescription>
      </CardHeader>

        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalSold ?? "--"}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Vendas
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
    </Card>
  )
}

export { PieChartCard }