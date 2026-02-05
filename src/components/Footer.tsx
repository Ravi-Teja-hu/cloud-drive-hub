import { Linkedin, Github, Youtube, Instagram } from "lucide-react";

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

  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-muted/50 hover:bg-primary/20 transition-colors group"
              aria-label={link.name}
            >
              <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
