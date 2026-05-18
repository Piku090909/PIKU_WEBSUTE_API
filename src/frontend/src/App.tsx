import AdminPanel from "@/components/AdminPanel";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialCards from "@/components/SocialCards";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";

function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <SocialCards />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <>
      {hash === "#admin" ? <AdminPanel /> : <ProfilePage />}
      <Toaster richColors position="top-right" />
    </>
  );
}
