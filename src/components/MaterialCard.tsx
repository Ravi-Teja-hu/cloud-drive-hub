import { Link } from "react-router-dom";
import cloudHero from "@/assets/cloud-hero.jpg";
import devopsHero from "@/assets/devops-hero.jpg";
import linuxHero from "@/assets/linux-hero.jpg";

interface MaterialCardProps {
  category: "cloud" | "devops" | "linux";
  title?: string;
  description?: string;
  materialsCount?: number;
}

const categoryImages = {
  cloud: cloudHero,
  devops: devopsHero,
  linux: linuxHero,
};

const categoryLabels = {
  cloud: "Cloud Computing",
  devops: "DevOps",
  linux: "Linux",
};

const categoryDescriptions = {
  cloud: "AWS, Azure, GCP and more cloud platforms",
  devops: "CI/CD, Docker, Kubernetes and automation",
  linux: "Shell scripting, system administration and security",
};

const MaterialCard = ({
  category,
  title,
  description,
  materialsCount = 0,
}: MaterialCardProps) => {
  return (
    <Link
      to={`/category/${category}`}
      className={`category-${category} glass-card glow-border group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={categoryImages[category]}
          alt={categoryLabels[category]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-${category}/20 text-${category}`}
            style={{
              backgroundColor: `hsl(var(--${category}) / 0.2)`,
              color: `hsl(var(--${category}))`,
            }}
          >
            {category.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title || categoryLabels[category]}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {description || categoryDescriptions[category]}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {materialsCount} materials
          </span>
          <span
            className="text-sm font-medium transition-colors"
            style={{ color: `hsl(var(--${category}))` }}
          >
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MaterialCard;
