import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MaterialCard from "@/components/MaterialCard";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Cloud, Server, Terminal } from "lucide-react";

const Index = () => {
  const [counts, setCounts] = useState({
    cloud: 0,
    devops: 0,
    linux: 0,
  });

  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const phrases = ["Cloud & DevOps", "AWS & Azure", "Docker & K8s", "CI/CD Pipelines"];

  useEffect(() => {
    const fetchCounts = async () => {
      const categories = ["cloud", "devops", "linux"] as const;
      const newCounts: Record<string, number> = {};

      for (const category of categories) {
        const { count } = await supabase
          .from("materials")
          .select("*", { count: "exact", head: true })
          .eq("category", category);
        newCounts[category] = count || 0;
      }

      setCounts(newCounts as typeof counts);
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const currentPhrase = phrases[loopNum % phrases.length];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 50 : (displayText === currentPhrase ? 2000 : 100);

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else {
        setDisplayText(
          isDeleting
            ? currentPhrase.substring(0, displayText.length - 1)
            : currentPhrase.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, phrases]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Cloud className="w-4 h-4" />
              Your DevOps Learning Hub
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Master{" "}
              <span className="text-primary">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
              <br />
              <span className="text-muted-foreground text-2xl md:text-3xl font-medium">
                One Resource at a Time
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access curated materials for Cloud, DevOps, and Linux. Upload your
              resources to share with the community.
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 md:gap-16 mb-16">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Cloud className="w-5 h-5 text-cloud" />
                <span className="text-2xl font-bold text-foreground">
                  {counts.cloud}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Cloud Materials</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Server className="w-5 h-5 text-devops" />
                <span className="text-2xl font-bold text-foreground">
                  {counts.devops}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">DevOps Materials</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Terminal className="w-5 h-5 text-linux" />
                <span className="text-2xl font-bold text-foreground">
                  {counts.linux}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Linux Materials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Explore Categories
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <MaterialCard category="cloud" materialsCount={counts.cloud} />
            <MaterialCard category="devops" materialsCount={counts.devops} />
            <MaterialCard category="linux" materialsCount={counts.linux} />
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
