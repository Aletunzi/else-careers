import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
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
