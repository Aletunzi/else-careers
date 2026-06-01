import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reality from "@/components/Reality";
import Solution from "@/components/Solution";
import TryIt from "@/components/TryIt";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <div className="flex h-[100dvh] flex-col bg-background md:h-auto md:min-h-screen">
        <Header />
        <main className="flex flex-1 flex-col">
          <Hero />
        </main>
      </div>
      <Reality />
      <Solution />
      <TryIt />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
};

export default Index;
