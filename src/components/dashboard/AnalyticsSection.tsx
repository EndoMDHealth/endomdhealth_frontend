import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Legend,
  Area,
  AreaChart
} from "recharts";
import { FileDown, TrendingUp, Clock, AlertTriangle, FileText, Users } from "lucide-react";
import { toast } from "sonner";

const monthlyData = [
  { month: 'Jan', consults: 12 },
  { month: 'Feb', consults: 19 },
  { month: 'Mar', consults: 15 },
  { month: 'Apr', consults: 22 },
  { month: 'May', consults: 28 },
  { month: 'Jun', consults: 24 },
];

const ageGroupData = [
  { name: '0-2 yrs', value: 15, color: 'hsl(var(--accent))' },
  { name: '3-5 yrs', value: 25, color: 'hsl(168, 76%, 42%)' },
  { name: '6-10 yrs', value: 30, color: 'hsl(234, 55%, 40%)' },
  { name: '11-14 yrs', value: 20, color: 'hsl(210, 80%, 48%)' },
  { name: '15-18 yrs', value: 10, color: 'hsl(280, 60%, 50%)' },
];

const conditionData = [
  { condition: 'Obesity', count: 35 },
  { condition: 'Growth', count: 28 },
  { condition: 'Diabetes', count: 22 },
  { condition: 'Puberty', count: 18 },
  { condition: 'Thyroid', count: 15 },
  { condition: 'PCOS', count: 8 },
  { condition: 'Other', count: 12 },
];

const responseTimeData = [
  { week: 'W1', time: 42 },
  { week: 'W2', time: 38 },
  { week: 'W3', time: 35 },
  { week: 'W4', time: 32 },
  { week: 'W5', time: 28 },
  { week: 'W6', time: 30 },
];

const urgencyData = [
  { name: 'Urgent', value: 15, color: 'hsl(0, 84%, 60%)' },
  { name: 'Normal', value: 85, color: 'hsl(168, 76%, 42%)' },
];

interface AnalyticsSectionProps {
  isAdmin?: boolean;
}

const summaryStats = [
  { label: 'Total E-Consults', value: '138', icon: FileText, trend: '+12%', trendUp: true },
  { label: 'Avg Response Time', value: '32 hrs', icon: Clock, trend: '-8%', trendUp: true },
  { label: 'Urgent Cases', value: '15', icon: AlertTriangle, trend: '+3', trendUp: false },
  { label: 'Active Providers', value: '8', icon: Users, trend: '+2', trendUp: true },
];

export const AnalyticsSection = ({ isAdmin = false }: AnalyticsSectionProps) => {
  const handleDownloadReport = () => {
    toast.success('Report download initiated');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            {isAdmin ? "Clinic-wide performance metrics" : "Your e-consult performance metrics"}
          </p>
        </div>
        <Button onClick={handleDownloadReport} variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-card border-border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className={`flex items-center text-sm font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-500'}`}>
                    <TrendingUp className={`h-3 w-3 mr-1 ${!stat.trendUp ? 'rotate-180' : ''}`} />
                    {stat.trend}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly E-Consults */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">E-Consults by Month</CardTitle>
            <CardDescription>Monthly submission trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar 
                  dataKey="consults" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Patient Age Groups */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Patient Age Distribution</CardTitle>
            <CardDescription>Breakdown by age group</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={ageGroupData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {ageGroupData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conditions */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">E-Consults by Condition</CardTitle>
            <CardDescription>Distribution across condition categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={conditionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="condition" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--accent))" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time Trends */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Response Time Trends</CardTitle>
            <CardDescription>Average hours to first response</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="h" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value} hours`, 'Avg Response']}
                />
                <Area 
                  type="monotone" 
                  dataKey="time" 
                  stroke="hsl(168, 76%, 42%)" 
                  fill="hsl(168, 76%, 42% / 0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Urgency Distribution */}
        <Card className="bg-card border-border shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Urgency Distribution</CardTitle>
            <CardDescription>Breakdown of urgent vs normal submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-12">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={urgencyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {urgencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-4">
                {urgencyData.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
