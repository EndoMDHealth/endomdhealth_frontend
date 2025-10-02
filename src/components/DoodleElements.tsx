// Playful hand-drawn doodle SVG elements for child-friendly design

export const StarDoodle = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 15L55 40L80 45L57 60L62 85L50 70L38 85L43 60L20 45L45 40L50 15Z" 
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const HeartDoodle = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 85C50 85 15 60 15 35C15 20 25 15 35 20C42 24 47 30 50 35C53 30 58 24 65 20C75 15 85 20 85 35C85 60 50 85 50 85Z"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const RocketDoodle = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10C50 10 70 30 70 50C70 55 65 60 60 60H40C35 60 30 55 30 50C30 30 50 10 50 10Z"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="50" cy="35" r="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
    <path d="M35 60L30 80M65 60L70 80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M25 45C25 45 20 45 18 50C16 55 20 58 25 58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M75 45C75 45 80 45 82 50C84 55 80 58 75 58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const ArrowDoodle = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 50Q30 30 50 50T90 50M75 40L90 50L75 60"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const SwirlDoodle = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10C70 10 85 25 85 45C85 65 70 80 50 80C30 80 15 65 15 45C15 32 23 22 35 18"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
  </svg>
);

export const GrowthChartDoodle = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 85L15 15M15 85L85 85" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M25 70L35 55L50 60L65 40L80 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="25" cy="70" r="4" fill="currentColor"/>
    <circle cx="35" cy="55" r="4" fill="currentColor"/>
    <circle cx="50" cy="60" r="4" fill="currentColor"/>
    <circle cx="65" cy="40" r="4" fill="currentColor"/>
    <circle cx="80" cy="35" r="4" fill="currentColor"/>
  </svg>
);

export const ShoeDoodle = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 50C20 50 25 35 35 35L45 38L50 35L55 38L65 35C75 35 80 50 80 50C80 60 75 70 60 70H30C25 70 20 60 20 50Z"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M35 45L65 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const FoodDoodle = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="60" r="25" stroke="currentColor" strokeWidth="2.5" fill="none"/>
    <path d="M30 60C30 60 40 55 50 60C60 65 70 60 70 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M40 50L42 45M50 48L52 42M60 50L62 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M35 25L35 40M42 20L42 40M49 22L49 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const MeasuringLineDoodle = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10L50 90M45 10L55 10M45 30L55 30M45 50L55 50M45 70L55 70M45 90L55 90"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);