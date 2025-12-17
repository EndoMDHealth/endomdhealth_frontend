import { Badge } from "@/components/ui/badge";
import { User, Users } from "lucide-react";

interface SubmissionAttributionProps {
  submittedByName?: string;
  providerName?: string;
  isOnBehalf?: boolean;
  variant?: 'inline' | 'badge' | 'full';
  className?: string;
}

export const SubmissionAttribution = ({
  submittedByName,
  providerName,
  isOnBehalf = false,
  variant = 'inline',
  className = '',
}: SubmissionAttributionProps) => {
  if (!submittedByName && !providerName) {
    return null;
  }

  if (variant === 'badge') {
    if (isOnBehalf && submittedByName && providerName) {
      return (
        <Badge variant="outline" className={`text-xs ${className}`}>
          <Users className="h-3 w-3 mr-1" />
          On behalf of {providerName}
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className={`text-xs ${className}`}>
        <User className="h-3 w-3 mr-1" />
        {providerName || submittedByName}
      </Badge>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`text-sm ${className}`}>
        {isOnBehalf && submittedByName && providerName ? (
          <>
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">{submittedByName}</span>
              {' '}on behalf of{' '}
              <span className="font-medium text-foreground">{providerName}</span>
            </p>
          </>
        ) : (
          <p className="text-muted-foreground">
            Submitted by{' '}
            <span className="font-medium text-foreground">{providerName || submittedByName}</span>
          </p>
        )}
      </div>
    );
  }

  // Default inline variant
  if (isOnBehalf && submittedByName && providerName) {
    return (
      <span className={`text-xs text-muted-foreground ${className}`}>
        {submittedByName} on behalf of {providerName}
      </span>
    );
  }

  return (
    <span className={`text-xs text-muted-foreground ${className}`}>
      {providerName || submittedByName}
    </span>
  );
};
