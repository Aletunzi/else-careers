import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reality from "@/components/Reality";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.documentElement.classList.add("footer-dark");
    return () => document.documentElement.classList.remove("footer-dark");
  }, []);
  return (
    <>
      <div className="flex h-[100dvh] flex-col bg-background md:h-auto md:min-h-screen">
        <Header />
        <main className="flex flex-1 flex-col">
          <Hero />
        </main>
      </div>
      <Reality />
      <FAQ />
      <Footer />
    </>
  );
};

export default Index;
