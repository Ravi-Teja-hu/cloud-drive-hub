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
      className={`category-${category} glass-card glow-border group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl block h-full`}
    >
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={categoryImages[category]}
          alt={categoryLabels[category]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full backdrop-blur-sm"
            style={{
              backgroundColor: `hsl(var(--${category}) / 0.25)`,
              color: `hsl(var(--${category}))`,
              border: `1px solid hsl(var(--${category}) / 0.3)`,
            }}
          >
            <span 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: `hsl(var(--${category}))` }}
            />
            {category.toUpperCase()}
          </span>
        </div>

        {/* Materials Count Badge */}
        <div className="absolute bottom-4 right-4">
          <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-background/80 backdrop-blur-sm text-foreground border border-border/50">
            {materialsCount} materials
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title || categoryLabels[category]}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description || categoryDescriptions[category]}
        </p>
        
        {/* CTA */}
        <div className="flex items-center gap-2 font-medium transition-all group-hover:gap-3"
          style={{ color: `hsl(var(--${category}))` }}
        >
          <span>Explore Resources</span>
          <svg 
            className="w-4 h-4 transition-transform group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default MaterialCard;
