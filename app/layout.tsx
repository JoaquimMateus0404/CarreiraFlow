import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarreiraFlow — Currículo & Carta de Apresentação",
  description:
    "Ferramenta gratuita e de código aberto para criar currículos e cartas de apresentação profissionais, com exportação em PDF.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Bootstrap 5 CSS (grelha, dropdowns, modais) */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        {/* Font Awesome Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Estilos próprios da aplicação (mesmos estilos já testados) */}
        <link rel="stylesheet" href="/app.css" />
      </head>
      <body>
        {children}

        {/* Bootstrap Bundle JS (dropdowns, modais) */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        {/* html2canvas + jsPDF: usados na exportação de PDF com paginação manual */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
        {/* Lógica da aplicação (editor, modelos, temas, rascunhos, PDF) */}
        <script src="/app.js"></script>
      </body>
    </html>
  );
}
