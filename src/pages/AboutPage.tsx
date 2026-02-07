import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Cloud, Server, Terminal, ArrowRight } from "lucide-react";

const AboutPage = () => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const brandName = "CloudDrive";

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === brandName) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else {
        setDisplayText(
          isDeleting
            ? brandName.substring(0, displayText.length - 1)
            : brandName.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum]);
  const features = [
    {
      icon: Cloud,
      title: "Cloud Computing",
      description: "Learn AWS, Azure, GCP and other cloud platforms with hands-on materials.",
      color: "cloud",
    },
    {
      icon: Server,
      title: "DevOps Practices",
      description: "Master CI/CD pipelines, containerization, and infrastructure automation.",
      color: "devops",
    },
    {
      icon: Terminal,
      title: "Linux Administration",
      description: "Explore shell scripting, system administration, and security best practices.",
      color: "linux",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About{" "}
            <span className="text-primary">
              {displayText.split("").map((char, index) => (
                <span key={index} className={char === "C" || char === "D" ? "text-red-500" : ""}>
                  {char}
                </span>
              ))}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            CloudDrive is your one-stop platform for DevOps and Cloud learning materials.
            Upload, share, and download resources to accelerate your career in cloud technologies.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`category-${feature.color} glass-card glow-border p-8 text-center`}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `hsl(var(--${feature.color}) / 0.2)` }}
                >
                  <feature.icon
                    className="w-8 h-8"
                    style={{ color: `hsl(var(--${feature.color}))` }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join our community of DevOps engineers and cloud practitioners. Share knowledge and grow together.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
