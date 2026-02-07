import { Link } from "react-router-dom";
import { Linkedin, Github, Youtube, Instagram, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo.png";

const Footer = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/raviwithai/",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      href: "https://github.com/Ravi-Teja4",
      icon: Github,
    },
    {
      name: "YouTube",
      href: "http://www.youtube.com/@ravitejadeevela",
      icon: Youtube,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/devops_with_ravi?igsh=Ym13MGs4OGM2Y3E3&utm_source=ig_contact_invite",
      icon: Instagram,
    },
  ];

  const siteMapLinks = [
    { name: "Homepage", href: "/" },
    { name: "About", href: "/about" },
    { name: "Cloud", href: "/category/cloud" },
    { name: "DevOps", href: "/category/devops" },
    { name: "Linux", href: "/category/linux" },
    { name: "Tasks", href: "/category/tasks" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Services", href: "#" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#1a3a3a] dark:bg-[#0d2626] text-white overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute right-0 top-0 h-full w-1/2 opacity-20"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50 L250 150 L100 250 L350 200 L200 100 L350 50"
            stroke="#d4a855"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logoImage}
                alt="CloudDrive Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold">
                <span className="text-red-500">C</span>loud
                <span className="text-red-500">D</span>rive
              </span>
            </Link>
            <p className="text-gray-300 max-w-md leading-relaxed">
              Empowering learners with comprehensive Cloud, DevOps, and Linux
              resources to accelerate their tech career journey.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-[#d4a855]/20 transition-colors group"
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5 text-gray-300 group-hover:text-[#d4a855] transition-colors" />
                </a>
              ))}
            </div>

            {/* Back to Top Button */}
            <Button
              onClick={scrollToTop}
              variant="outline"
              className="border-gray-500 text-gray-300 hover:bg-white/10 hover:text-white gap-2"
            >
              <ChevronUp className="w-4 h-4" />
              BACK TO TOP
            </Button>
          </div>

          {/* Site Map */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#d4a855]">Site Map</h3>
            <ul className="space-y-3">
              {siteMapLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#d4a855]">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#d4a855] py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#1a3a3a] font-medium text-sm">
            Copyright © {new Date().getFullYear()}, CloudDrive. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
