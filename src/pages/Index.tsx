import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-background md:h-auto md:min-h-screen md:overflow-visible">
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
