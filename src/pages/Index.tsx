import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductIntro from "@/components/ProductIntro";
import HiredAt from "@/components/HiredAt";
import Solution from "@/components/Solution";
import Screening from "@/components/Screening";
import AutoApply from "@/components/AutoApply";
import Reviews from "@/components/Reviews";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <div className="flex min-h-svh flex-col bg-background md:min-h-screen">
        <Header />
        <main className="flex flex-1 flex-col">
          <Hero />
        </main>
      </div>
      <ProductIntro />
      <ProblemTwo />
      <HiredAt />
      <Solution />
      <Screening />
      <AutoApply />
      <Reviews />
      <Pricing />
      <FAQ />
      <ClosingCTA />
      <Footer />
    </>
  );
};

export default Index;
