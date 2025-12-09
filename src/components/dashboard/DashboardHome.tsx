import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle,
  Eye,
  PlusCircle,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { useState } from "react";

interface DashboardHomeProps {
  physicianName: string;
  stats: {
    total: number;
    appointmentsBooked: number;
    avgResponseTime: string;
    urgent: number;
    pendingReview: number;
    active: number;
  };
  recentConsults: Array<{
    id: string;
    patient_initials: string;
    patient_age: number;
    condition_category: string;
    status: string;
    created_at: string;
  }>;
  onSubmitNew: () => void;
  onViewConsult: (consult: any) => void;
}

// Metric card with trend indicator
const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue,
  onViewReport 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ElementType; 
  trend?: 'up' | 'down';
  trendValue?: string;
  onViewReport?: () => void;
}) => (
  <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all duration-300">
    <CardContent className="p-5">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          <div className="flex items-center justify-between mt-3">
            {trend && trendValue && (
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                trend === 'up' ? "text-green-600" : "text-red-600"
              )}>
                {trend === 'up' ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{trendValue}</span>
              </div>
            )}
            {onViewReport && (
              <Button variant="outline" size="sm" className="text-xs h-7 px-3" onClick={onViewReport}>
                View report
              </Button>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Monthly data for bar chart
const monthlyData = [
  { name: 'Feb', consults: 12, completed: 10 },
  { name: 'Mar', consults: 19, completed: 17 },
  { name: 'Apr', consults: 15, completed: 14 },
  { name: 'May', consults: 22, completed: 20 },
  { name: 'Jun', consults: 28, completed: 25 },
  { name: 'Jul', consults: 24, completed: 22 },
  { name: 'Aug', consults: 31, completed: 28 },
  { name: 'Sep', consults: 35, completed: 32 },
  { name: 'Oct', consults: 29, completed: 27 },
];

// Condition distribution for pie chart
const conditionData = [
  { name: 'Growth', value: 35, color: 'hsl(var(--primary))' },
  { name: 'Thyroid', value: 25, color: 'hsl(var(--accent))' },
  { name: 'Diabetes', value: 20, color: 'hsl(142, 71%, 45%)' },
  { name: 'Puberty', value: 12, color: 'hsl(262, 83%, 58%)' },
  { name: 'Other', value: 8, color: 'hsl(0, 84%, 60%)' },
];

// Success rate trend data
const successData = [
  { name: 'Week 1', rate: 85 },
  { name: 'Week 2', rate: 88 },
  { name: 'Week 3', rate: 82 },
  { name: 'Week 4', rate: 90 },
  { name: 'Week 5', rate: 92 },
  { name: 'Week 6', rate: 94 },
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    submitted: "bg-blue-100 text-blue-700 border-blue-200",
    under_review: "bg-amber-100 text-amber-700 border-amber-200",
    awaiting_info: "bg-orange-100 text-orange-700 border-orange-200",
    completed: "bg-green-100 text-green-700 border-green-200",
  };
  return styles[status] || styles.submitted;
};

const formatStatus = (status: string) => {
  return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const DashboardHome = ({ 
  physicianName, 
  stats, 
  recentConsults, 
  onSubmitNew,
  onViewConsult 
}: DashboardHomeProps) => {
  const [chartPeriod, setChartPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const firstName = physicianName.split(' ')[0] || 'Doctor';

  const pendingApprovals = recentConsults.filter(c => c.status === 'submitted' || c.status === 'under_review').slice(0, 4);
  const todayConsults = recentConsults.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome Back, Dr. {firstName}!
        </h1>
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {(['weekly', 'monthly', 'yearly'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setChartPeriod(period)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                chartPeriod === period 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Top Row - Metrics & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Metric Cards */}
        <div className="lg:col-span-1 grid grid-cols-2 gap-4">
          <MetricCard
            title="Total E-Consults"
            value={stats.total}
            icon={FileText}
            trend="up"
            trendValue="↑ 10%"
            onViewReport={() => {}}
          />
          <MetricCard
            title="Completed"
            value={stats.appointmentsBooked}
            icon={CheckCircle}
            trend="up"
            trendValue="↑ 15%"
            onViewReport={() => {}}
          />
          <MetricCard
            title="Active"
            value={stats.active}
            icon={Eye}
            trend="up"
            trendValue="↑ 8%"
            onViewReport={() => {}}
          />
          <MetricCard
            title="Avg Response"
            value={stats.avgResponseTime}
            icon={Clock}
            trend="down"
            trendValue="↓ 10%"
            onViewReport={() => {}}
          />
        </div>

        {/* Right Column - Bar Chart */}
        <Card className="lg:col-span-2 bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">E-Consults Overview</CardTitle>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-primary" />
                  <span className="text-muted-foreground">Submitted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-accent" />
                  <span className="text-muted-foreground">Completed</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }} 
                  />
                  <Bar dataKey="consults" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row - Pie Chart, Next Patient, Pending Approvals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Conditions Distribution */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Top Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-36 w-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={conditionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {conditionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {conditionData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent E-Consult Details */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Recent Submission</CardTitle>
          </CardHeader>
          <CardContent>
            {recentConsults[0] ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{recentConsults[0].patient_initials}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {recentConsults[0].condition_category} Consult
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Patient Age</p>
                    <p className="font-medium">{recentConsults[0].patient_age} years</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Submitted</p>
                    <p className="font-medium">
                      {new Date(recentConsults[0].created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Condition</p>
                    <p className="font-medium capitalize">{recentConsults[0].condition_category}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge variant="outline" className={getStatusBadge(recentConsults[0].status)}>
                      {formatStatus(recentConsults[0].status)}
                    </Badge>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No recent submissions</p>
                <Button variant="link" onClick={onSubmitNew}>Submit your first e-consult</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Reviews */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingApprovals.length > 0 ? pendingApprovals.map((consult) => (
                <div 
                  key={consult.id} 
                  className="flex items-center justify-between py-2 border-b border-border last:border-0 cursor-pointer hover:bg-muted/50 -mx-2 px-2 rounded-lg transition-colors"
                  onClick={() => onViewConsult(consult)}
                >
                  <div>
                    <p className="font-medium text-sm">{consult.patient_initials}</p>
                    <p className="text-xs text-muted-foreground capitalize">{consult.condition_category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(consult.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex gap-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground text-center py-4">No pending reviews</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Today's Consults, Success Stats, Totals, Quick Action */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Today's Activity */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              Recent Activity
              <Badge variant="secondary" className="ml-auto">{todayConsults.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayConsults.map((consult) => (
                <div 
                  key={consult.id} 
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-xs text-muted-foreground capitalize">Condition</p>
                    <p className="font-medium text-sm capitalize">{consult.condition_category}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(consult.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              {todayConsults.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Success Stats */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl font-bold">94%</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">↑ 2%</Badge>
            </div>
            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={successData}>
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              E-consults responded to within 48 hours
            </p>
          </CardContent>
        </Card>

        {/* Total Stats */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Total This Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-4xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">E-Consults Submitted</p>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-2xl font-bold text-foreground">{stats.appointmentsBooked}</p>
              <p className="text-sm text-muted-foreground">Completed All Time</p>
            </div>
            <Button variant="outline" className="w-full mt-2" size="sm">
              View More
            </Button>
          </CardContent>
        </Card>

        {/* Quick Action CTA */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0 shadow-lg">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-bold mb-2">Submit New E-Consult</h3>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Get pediatric endocrinology guidance within 24-48 hours
              </p>
            </div>
            <Button 
              onClick={onSubmitNew}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              New E-Consult
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
