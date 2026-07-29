import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemTwo from "@/components/ProblemTwo";
import Solution from "@/components/Solution";
import Screening from "@/components/Screening";
import TryIt from "@/components/TryIt";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
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
      <ProblemTwo />
      <Solution />
      <Screening />
      <TryIt />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
};

export default Index;
