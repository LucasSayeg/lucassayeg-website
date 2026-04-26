import { ComoAjuda } from "@/ui/home/ComoAjuda";
import { Contato } from "@/ui/home/Contato";
import { FAQ } from "@/ui/home/FAQ";
import { Footer } from "@/ui/home/Footer";
import { Header } from "@/ui/home/Header";
import { Hero } from "@/ui/home/Hero";
import { Servicos } from "@/ui/home/Servicos";
import { Sobre } from "@/ui/home/Sobre";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ComoAjuda />
        <Sobre />
        <Servicos />
        <FAQ />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
