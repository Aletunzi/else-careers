import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-col" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
