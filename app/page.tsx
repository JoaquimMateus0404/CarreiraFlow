import fs from "node:fs";
import path from "node:path";
import AboutModal from "@/components/AboutModal";
import DraftsModal from "@/components/DraftsModal";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import TemplateSwitcher from "@/components/TemplateSwitcher";
import IconPicker from "@/components/IconPicker";


function getAppBodyHtml(): string {
  const filePath = path.join(process.cwd(), "content", "app-body.html");
  return fs.readFileSync(filePath, "utf8");
}

export default function Home() {
  const html = getAppBodyHtml();
  return (
    <>
      <div id="app-root" dangerouslySetInnerHTML={{ __html: html }} />
      <ThemeSwitcher />
      <TemplateSwitcher />
      <IconPicker />
      <AboutModal />
      <DraftsModal />
    </>
  );
}
