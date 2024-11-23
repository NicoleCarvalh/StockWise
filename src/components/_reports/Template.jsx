import { forwardRef } from 'react';

const ReportTemplate = forwardRef(
  ({ title }, ref) => {
    return (
      <main>
        <div ref={ref} style={{ padding: '20px', background: '#fff' }}>
          <h1>{title ?? "Relatório Mensal"}</h1>
          <p>### {title}</p>
        </div>
      </main>
    );
  }
);

export { ReportTemplate };