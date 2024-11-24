import { ProductsContext } from '@/context/ProductsContextProvider';
import { SalesContext } from '@/context/SalesContextProvider';
import { forwardRef, useContext, useEffect, useState } from 'react';

const ReportTemplate = forwardRef(
  ({ title }, ref) => {
    const { sales, refreshSales } = useContext(SalesContext)
    const { products, refreshProducts } = useContext(ProductsContext)

    useEffect(() => {
      console.log("Template de relatórios foi carrego.")

      refreshProducts()
      refreshSales()
    }, [])

    return (
      <main ref={ref} className="p-[20mm]">
        <section className="flex flex-col gap-2">
          <h1>{title ?? "Relatório Mensal"}</h1>
          <p>No presente relatório você poderá analisar todos os dados de vendas, compras, produtos, clientes e muito mais em um só lugar!</p>
        </section>

        <section>
          <h2>Sumário</h2>

          <ul>
            <li>Análise de todos os produtos em: {"periodo"}</li>
            <li>Vendas realizadas durante o período: {"periodo"}</li>
            <li>Compras realizadas durante o período: {"periodo"}</li>
            <li>Clientes cadastrados até {"** data final **"}</li>
            <li>Organização dos estoques</li>
            <li>Gráficos gerais</li>
          </ul>
        </section>

        <section>
          <h2>Produtos</h2>

          <ul>
            {
              products.map(product => (
                <li>{product.name}</li>
              ))
            }
          </ul>
        </section>

        <section>
          <h2>Vendas</h2>

          <ul>
            {
              sales.map(sale => (
                <li>{sale.name}</li>
              ))
            }
          </ul>
        </section>
      </main>
    );
  }
);

export { ReportTemplate };