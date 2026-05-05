import { Crown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const [error, setError] = useState(false);
  
  const sizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-24 h-24"
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 48
  };

  return (
    <div className={cn(
      "flex items-center justify-center rounded-lg gold-border gold-glow overflow-hidden transition-all duration-500",
      error ? "bg-primary" : "bg-primary/10",
      sizes[size],
      className
    )}>
      {!error ? (
        <img 
          src="https://lh3.googleusercontent.com/d/1rkUbrNUsvfw6LRuVTWZ3TOA10Hn-ExJL" 
          alt="Elite Group" 
          className="w-full h-full object-contain"
          onError={() => setError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <Crown size={iconSizes[size]} className="text-black animate-pulse" />
      )}
    </div>
  );
}
