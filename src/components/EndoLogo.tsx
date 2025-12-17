import { cn } from "@/lib/utils";

interface EndoLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const EndoLogo = ({ className, size = "md" }: EndoLogoProps) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeClasses[size], className)}
      aria-hidden="true"
    >
      {/* Stylized "E" mark representing EndoMD */}
      <circle
        cx="12"
        cy="12"
        r="10"
        className="fill-accent"
      />
      <path
        d="M8 8h8M8 12h6M8 16h8"
        className="stroke-accent-foreground"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default EndoLogo;
