import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { 
  User, 
  FileText, 
  Eye,
  Mail,
  Phone,
  Building,
  Loader2
} from "lucide-react";

interface Provider {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  specialty?: string;
  practice_name?: string;
  phone?: string;
  total_consults: number;
  active_consults: number;
  role: 'physician' | 'admin' | 'admin_staff' | 'specialist';
}

interface TeamSectionProps {
  onViewProviderConsults?: (providerId: string) => void;
}

export const TeamSection = ({ onViewProviderConsults }: TeamSectionProps) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    setLoading(true);
    
    // Fetch physician roles with profile data
    const { data: rolesData, error: rolesError } = await supabase
      .from('physician_roles')
      .select('*');

    if (rolesError) {
      console.error('Error fetching roles:', rolesError);
      setLoading(false);
      return;
    }

    // Fetch profiles for these users
    const userIds = rolesData?.map(r => r.user_id) || [];
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('*')
      .in('id', userIds);

    // Fetch consult counts
    const { data: consultsData } = await supabase
      .from('e_consults')
      .select('physician_id, status');

    // Combine data
    const combinedProviders: Provider[] = (rolesData || []).map(role => {
      const profile = profilesData?.find(p => p.id === role.user_id);
      const userConsults = consultsData?.filter(c => c.physician_id === role.user_id) || [];
      const activeConsults = userConsults.filter(c => c.status !== 'completed').length;
      
      return {
        id: role.id,
        user_id: role.user_id,
        full_name: profile?.full_name || 'Unknown Provider',
        email: profile?.email || '',
        specialty: role.specialty || undefined,
        practice_name: role.practice_name || undefined,
        phone: role.phone || undefined,
        total_consults: userConsults.length,
        active_consults: activeConsults,
        role: role.role,
      };
    });

    setProviders(combinedProviders);
    setLoading(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Providers & Team</h2>
          <p className="text-muted-foreground">Manage your clinic's providers and view their activity</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {providers.length} Providers
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{providers.length}</p>
                <p className="text-sm text-muted-foreground">Total Providers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-xl">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {providers.reduce((acc, p) => acc + p.total_consults, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total E-Consults</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {providers.reduce((acc, p) => acc + p.active_consults, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Active E-Consults</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Providers Table */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">All Providers</CardTitle>
          <CardDescription>View provider details and their e-consult activity</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {providers.length === 0 ? (
            <div className="p-12 text-center">
              <User className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Providers Found</h3>
              <p className="text-muted-foreground">Add providers to your clinic to get started.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold">Provider</TableHead>
                  <TableHead className="font-semibold">Contact</TableHead>
                  <TableHead className="font-semibold">Practice</TableHead>
                  <TableHead className="font-semibold text-center">E-Consults</TableHead>
                  <TableHead className="font-semibold text-center">Active</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providers.map((provider) => (
                  <TableRow key={provider.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {getInitials(provider.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{provider.full_name}</p>
                          {provider.specialty && (
                            <p className="text-xs text-muted-foreground">{provider.specialty}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {provider.email && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span className="truncate max-w-[150px]">{provider.email}</span>
                          </div>
                        )}
                        {provider.phone && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>{provider.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {provider.practice_name ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Building className="h-3 w-3 text-muted-foreground" />
                          <span>{provider.practice_name}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-semibold">{provider.total_consults}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={provider.active_consults > 0 ? "default" : "secondary"}>
                        {provider.active_consults}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={provider.role === 'admin' ? 'default' : provider.role === 'specialist' ? 'secondary' : 'outline'}>
                        {provider.role === 'admin' ? 'Admin' : provider.role === 'specialist' ? 'Specialist' : 'Physician'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onViewProviderConsults?.(provider.user_id)}
                        disabled={provider.total_consults === 0}
                        className="hover:bg-primary/10"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
