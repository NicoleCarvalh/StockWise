import { ProductsContext } from '@/context/ProductsContextProvider';
import { SalesContext } from '@/context/SalesContextProvider';
import { forwardRef, useContext, useEffect, useState } from 'react';

const ReportTemplate = forwardRef(
  ({ title }, ref) => {
    const { sales, refreshSales } = useContext(SalesContext)
    const { products, refreshProducts } = useContext(ProductsContext)

    useEffect(() => {
      refreshProducts()
      refreshSales()
    }, [])

    return (
      <main ref={ref} className="p-4 text-gray-800 font-sans">
        {/* Título do relatório */}
        <section className="mb-6 ">
          <h1 className="text-[2rem] font-bold text-center">{title ?? "Relatório Mensal"}</h1>
          <p className="text-[0.8rem] text-center mt-2">
            No presente relatório você poderá analisar todos os dados de vendas, compras, produtos,
            clientes e muito mais em um só lugar!
          </p>
        </section>

        {/* Sumário */}
        <section className="mb-6">
          <h2 className="text-[1.5rem] font-semibold">Sumário</h2>
          <ul className="list-disc ml-5 mt-2 text-sm">
            <li>Análise de todos os produtos em: {"periodo"}</li>
            <li>Vendas realizadas durante o período: {"periodo"}</li>
            <li>Compras realizadas durante o período: {"periodo"}</li>
            <li>Clientes cadastrados até {"** data final **"}</li>
            <li>Organização dos estoques</li>
            <li>Gráficos gerais</li>
          </ul>
        </section>

        {/* Produtos */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold">Produtos</h2>
          <ul className="list-disc ml-5 mt-2 text-sm">
            {products.map((product, index) => (
              <li key={index}>{product.name}</li>
            ))}
          </ul>
        </section>

        {/* Vendas */}
        <section>
          <h2 className="text-xl font-semibold">Vendas</h2>
          <ul className="list-disc ml-5 mt-2 text-sm">
            {sales.map((sale, index) => (
              <li key={index}>{sale.name}</li>
            ))}
          </ul>
        </section>
      </main>
    );
  }
);

export { ReportTemplate };