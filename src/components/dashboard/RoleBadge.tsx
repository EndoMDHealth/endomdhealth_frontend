import { Badge } from "@/components/ui/badge";
import { Stethoscope, Users, Shield } from "lucide-react";

type PhysicianRole = 'physician' | 'admin' | 'admin_staff' | 'specialist';

interface RoleBadgeProps {
  role: PhysicianRole;
  className?: string;
}

const roleConfig: Record<PhysicianRole, { label: string; icon: React.ElementType; className: string }> = {
  physician: {
    label: 'Provider',
    icon: Stethoscope,
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  admin: {
    label: 'Admin',
    icon: Shield,
    className: 'bg-purple-100 text-purple-700 border-purple-200',
  },
  admin_staff: {
    label: 'Admin Staff',
    icon: Users,
    className: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  specialist: {
    label: 'Specialist',
    icon: Stethoscope,
    className: 'bg-accent/10 text-accent border-accent/20',
  },
};

export const RoleBadge = ({ role, className = '' }: RoleBadgeProps) => {
  const config = roleConfig[role] || roleConfig.physician;
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`${config.className} ${className}`}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
};
