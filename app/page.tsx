import fs from "node:fs";
import path from "node:path";
import AboutModal from "@/components/AboutModal";

// A marcação da aplicação (barra de ferramentas, editor de CV, editor de
// Carta de Apresentação, modais) fica num ficheiro HTML próprio em
// /content. É a mesma marcação já testada — lida aqui no servidor e
// injetada diretamente, para não arriscar introduzir bugs a converter
// à mão para JSX sem conseguirmos compilar/testar neste ambiente.
function getAppBodyHtml(): string {
  const filePath = path.join(process.cwd(), "content", "app-body.html");
  return fs.readFileSync(filePath, "utf8");
}

export default function Home() {
  const html = getAppBodyHtml();
  return (
    <>
      <div id="app-root" dangerouslySetInnerHTML={{ __html: html }} />
      <AboutModal />
    </>
  );
}
