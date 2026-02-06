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
      className="group cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-[#1a3a3a] dark:bg-[#0d2626] relative"
    >
      {/* Decorative lines like footer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute right-0 top-0 h-full w-1/2 opacity-10"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 20 L150 80 L50 140 L180 120 L100 60 L180 20"
            stroke="#d4a855"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative h-48 overflow-hidden">
        <img
          src={categoryImages[category]}
          alt={categoryLabels[category]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a3a] dark:from-[#0d2626] via-[#1a3a3a]/60 dark:via-[#0d2626]/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span
            className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#d4a855]/20 text-[#d4a855]"
          >
            {category.toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="p-5 relative z-10">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#d4a855] transition-colors">
          {title || categoryLabels[category]}
        </h3>
        <p className="text-sm text-gray-300 mb-4">
          {description || categoryDescriptions[category]}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {materialsCount} materials
          </span>
          <span className="text-sm font-medium text-[#d4a855] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Explore <span>→</span>
          </span>
        </div>
      </div>

      {/* Bottom accent bar like footer copyright bar */}
      <div className="h-1 bg-[#d4a855]" />
    </Link>
  );
};

export default MaterialCard;
