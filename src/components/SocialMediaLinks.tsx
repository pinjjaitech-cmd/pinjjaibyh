"use client"
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { SOCIAL_MEDIA_CONFIG } from "@/constants/social-media";

interface SocialMediaLinksProps {
  className?: string;
  iconClassName?: string;
  showLabels?: boolean;
  layout?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "outlined";
}

const SocialMediaLinks = ({ 
  className = "",
  iconClassName = "",
  showLabels = false,
  layout = "horizontal",
  size = "md",
  variant = "default"
}: SocialMediaLinksProps) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Facebook":
        return Facebook;
      case "Instagram":
        return Instagram;
      case "Linkedin":
        return Linkedin;
      default:
        return Facebook;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-8 h-8";
      case "lg":
        return "w-12 h-12";
      default:
        return "w-10 h-10";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "minimal":
        return "hover:opacity-70";
      case "outlined":
        return "border border-(--brand-white)/20 hover:border-(--brand-white)/40";
      default:
        return "bg-(--brand-white)/10 hover:bg-(--brand-white)/20";
    }
  };

  const getLayoutClasses = () => {
    return layout === "vertical" ? "flex-col gap-3" : "flex-row gap-4";
  };

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return "w-4 h-4";
      case "lg":
        return "w-6 h-6";
      default:
        return "w-5 h-5";
    }
  };

  return (
    <div className={`flex items-center justify-center ${getLayoutClasses()} ${className}`}>
      {SOCIAL_MEDIA_CONFIG.map((social, index) => {
        const IconComponent = getIconComponent(social.icon);
        
        return (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              ${getSizeClasses()}
              ${getVariantClasses()}
              rounded-full flex items-center justify-center transition-all duration-300 group
              ${variant === "default" ? "hover:scale-110" : ""}
              ${iconClassName}
            `}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: variant === "default" ? 1.1 : 1.05,
              ...(variant === "default" && { backgroundColor: "hsl(var(--brand-white) / 0.3)" })
            }}
            whileTap={{ scale: 0.95 }}
          >
            <IconComponent 
            />
            {showLabels && (
              <span className="ml-2 text-sm text-(--brand-white)/70 group-hover:text-(--brand-white) transition-colors duration-300">
                {social.name}
              </span>
            )}
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialMediaLinks;
