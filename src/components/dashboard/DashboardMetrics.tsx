import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Eye,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: { value: number; isPositive: boolean };
  variant?: 'default' | 'warning' | 'success' | 'accent';
}

const MetricCard = ({ title, value, icon: Icon, trend, variant = 'default' }: MetricCardProps) => {
  const variantStyles = {
    default: "bg-card border-border",
    warning: "bg-orange-50 border-orange-200",
    success: "bg-green-50 border-green-200",
    accent: "bg-accent/10 border-accent/20",
  };

  const iconStyles = {
    default: "text-muted-foreground",
    warning: "text-orange-500",
    success: "text-green-500",
    accent: "text-accent",
  };

  return (
    <Card className={cn(
      "shadow-sm hover:shadow-md transition-all duration-300 border",
      variantStyles[variant]
    )}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                <TrendingUp className={cn("h-3 w-3", !trend.isPositive && "rotate-180")} />
                <span>{trend.isPositive ? '+' : ''}{trend.value}% from last month</span>
              </div>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-xl",
            variant === 'default' ? "bg-muted" : "bg-white/50"
          )}>
            <Icon className={cn("h-6 w-6", iconStyles[variant])} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface DashboardMetricsProps {
  stats: {
    total: number;
    appointmentsBooked: number;
    avgResponseTime: string;
    urgent: number;
    pendingReview: number;
    active: number;
  };
}

export const DashboardMetrics = ({ stats }: DashboardMetricsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <MetricCard
        title="Total E-Consults"
        value={stats.total}
        icon={FileText}
        trend={{ value: 12, isPositive: true }}
      />
      <MetricCard
        title="Appointments Booked"
        value={stats.appointmentsBooked}
        icon={Calendar}
        variant="success"
      />
      <MetricCard
        title="Avg Response Time"
        value={stats.avgResponseTime}
        icon={Clock}
        variant="accent"
      />
      <MetricCard
        title="Urgent Submissions"
        value={stats.urgent}
        icon={AlertTriangle}
        variant={stats.urgent > 0 ? "warning" : "default"}
      />
      <MetricCard
        title="Pending Reviews"
        value={stats.pendingReview}
        icon={Eye}
      />
      <MetricCard
        title="Active Consults"
        value={stats.active}
        icon={FileText}
      />
    </div>
  );
};
