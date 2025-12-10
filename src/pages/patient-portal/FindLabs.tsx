import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search, Phone, Clock, ExternalLink, Navigation, Filter, Baby, Scan, Building, CreditCard, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import PatientPortalHeader from '@/components/patient-portal/PatientPortalHeader';
import Footer from '@/components/Footer';
import happyChild from '@/assets/child-grass-happy.jpg';

interface Lab {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  distance: string;
  services: string[];
  insurance: string[];
  isPediatricFriendly: boolean;
  hasImaging: boolean;
  walkIn: boolean;
  waitTime?: string;
}

const FindLabs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Patient';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    pediatricFriendly: false,
    hasImaging: false,
    walkIn: false,
    acceptsInsurance: false,
  });

  // Sample lab data - would come from an API in production
  const labs: Lab[] = [
    {
      id: '1',
      name: 'Quest Diagnostics',
      address: '123 Health Center Drive, Suite 100',
      city: 'Arlington, VA 22201',
      phone: '(703) 555-0123',
      hours: 'Mon-Fri: 7AM-5PM, Sat: 8AM-12PM',
      distance: '1.2 miles',
      services: ['Blood Draw', 'Urine Analysis', 'Glucose Testing', 'Thyroid Panel'],
      insurance: ['Aetna', 'Blue Cross', 'Cigna', 'United Healthcare'],
      isPediatricFriendly: true,
      hasImaging: false,
      walkIn: true,
      waitTime: '~15 min',
    },
    {
      id: '2',
      name: 'LabCorp',
      address: '456 Medical Plaza',
      city: 'Arlington, VA 22203',
      phone: '(703) 555-0456',
      hours: 'Mon-Fri: 6:30AM-6PM, Sat: 7AM-1PM',
      distance: '2.5 miles',
      services: ['Blood Draw', 'Drug Testing', 'Glucose Testing', 'Lipid Panel'],
      insurance: ['Aetna', 'Blue Cross', 'Humana', 'United Healthcare'],
      isPediatricFriendly: true,
      hasImaging: false,
      walkIn: true,
      waitTime: '~20 min',
    },
    {
      id: '3',
      name: 'Virginia Hospital Center Imaging',
      address: '789 Hospital Way',
      city: 'Arlington, VA 22205',
      phone: '(703) 555-0789',
      hours: 'Mon-Fri: 8AM-6PM',
      distance: '3.1 miles',
      services: ['X-Ray', 'MRI', 'CT Scan', 'Ultrasound'],
      insurance: ['Aetna', 'Blue Cross', 'Cigna', 'Medicaid'],
      isPediatricFriendly: true,
      hasImaging: true,
      walkIn: false,
    },
    {
      id: '4',
      name: 'Any Lab Test Now',
      address: '321 Convenience Ave',
      city: 'Falls Church, VA 22041',
      phone: '(703) 555-0321',
      hours: 'Mon-Sat: 8AM-4PM',
      distance: '4.8 miles',
      services: ['Blood Draw', 'Wellness Panels', 'Hormone Testing'],
      insurance: ['Self-Pay', 'Some insurances accepted'],
      isPediatricFriendly: false,
      hasImaging: false,
      walkIn: true,
    },
  ];

  const filteredLabs = labs.filter((lab) => {
    const matchesSearch = lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lab.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = (
      (!filters.pediatricFriendly || lab.isPediatricFriendly) &&
      (!filters.hasImaging || lab.hasImaging) &&
      (!filters.walkIn || lab.walkIn) &&
      (!filters.acceptsInsurance || lab.insurance.length > 1)
    );

    return matchesSearch && matchesFilters;
  });

  const handleGetDirections = (lab: Lab) => {
    const address = encodeURIComponent(`${lab.address}, ${lab.city}`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-patient-bg flex flex-col">
      <PatientPortalHeader firstName={firstName} />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Back Button & Title */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/patient-dashboard')}
              className="mb-4 text-patient-navy hover:bg-patient-teal/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-patient-navy text-center">
              Find Labs Near Me
            </h1>
            <p className="text-center text-muted-foreground mt-2">
              Locate nearby lab facilities for your testing needs
            </p>
          </div>

          {/* Search & Filters */}
          <div className="max-w-4xl mx-auto mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter ZIP code or city"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="border-patient-teal text-patient-teal"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button className="bg-patient-teal hover:bg-patient-teal/90">
                    <MapPin className="h-4 w-4 mr-2" />
                    Use My Location
                  </Button>
                </div>

                {/* Filter Options */}
                {showFilters && (
                  <div className="mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-4 gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={filters.pediatricFriendly}
                        onCheckedChange={(checked) => 
                          setFilters({ ...filters, pediatricFriendly: checked as boolean })
                        }
                      />
                      <span className="text-sm flex items-center gap-1">
                        <Baby className="h-4 w-4 text-patient-gold" />
                        Pediatric-friendly
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={filters.hasImaging}
                        onCheckedChange={(checked) => 
                          setFilters({ ...filters, hasImaging: checked as boolean })
                        }
                      />
                      <span className="text-sm flex items-center gap-1">
                        <Scan className="h-4 w-4 text-patient-gold" />
                        Imaging available
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={filters.walkIn}
                        onCheckedChange={(checked) => 
                          setFilters({ ...filters, walkIn: checked as boolean })
                        }
                      />
                      <span className="text-sm flex items-center gap-1">
                        <Building className="h-4 w-4 text-patient-gold" />
                        Walk-in
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={filters.acceptsInsurance}
                        onCheckedChange={(checked) => 
                          setFilters({ ...filters, acceptsInsurance: checked as boolean })
                        }
                      />
                      <span className="text-sm flex items-center gap-1">
                        <CreditCard className="h-4 w-4 text-patient-gold" />
                        Accepts insurance
                      </span>
                    </label>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder + Lab List */}
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
            {/* Map View */}
            <Card className="h-[400px] lg:h-auto">
              <CardContent className="p-0 h-full">
                <div className="h-full bg-gradient-to-br from-patient-teal/20 to-patient-navy/10 rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="h-16 w-16 text-patient-teal mx-auto mb-4" />
                    <p className="text-patient-navy font-medium">Interactive Map</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Map integration coming soon
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lab List */}
            <div className="space-y-4">
              <h3 className="font-semibold text-patient-navy">
                {filteredLabs.length} Labs Found
              </h3>
              
              {filteredLabs.length > 0 ? (
                filteredLabs.map((lab) => (
                  <Card 
                    key={lab.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-patient-teal"
                    onClick={() => setSelectedLab(lab)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-patient-navy">{lab.name}</h4>
                          <p className="text-sm text-muted-foreground">{lab.address}</p>
                          <p className="text-sm text-muted-foreground">{lab.city}</p>
                        </div>
                        <Badge variant="secondary" className="bg-patient-teal/10 text-patient-teal">
                          {lab.distance}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {lab.isPediatricFriendly && (
                          <Badge variant="outline" className="text-xs border-patient-gold text-patient-gold">
                            <Baby className="h-3 w-3 mr-1" />
                            Pediatric-friendly
                          </Badge>
                        )}
                        {lab.walkIn && (
                          <Badge variant="outline" className="text-xs">Walk-in</Badge>
                        )}
                        {lab.hasImaging && (
                          <Badge variant="outline" className="text-xs">Imaging</Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {lab.phone}
                        </span>
                        {lab.waitTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {lab.waitTime}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-patient-navy text-patient-navy"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLab(lab);
                          }}
                        >
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-patient-teal hover:bg-patient-teal/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGetDirections(lab);
                          }}
                        >
                          <Navigation className="h-4 w-4 mr-1" />
                          Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <img 
                      src={happyChild} 
                      alt="No results" 
                      className="w-24 h-24 object-cover rounded-full mx-auto mb-4 opacity-80"
                    />
                    <p className="text-muted-foreground">
                      No labs found matching your criteria
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Lab Details Modal */}
      <Dialog open={!!selectedLab} onOpenChange={() => setSelectedLab(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-patient-navy flex items-center gap-2">
              <MapPin className="h-5 w-5 text-patient-teal" />
              {selectedLab?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedLab && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-patient-navy">Address</p>
                    <p className="text-sm text-muted-foreground">{selectedLab.address}</p>
                    <p className="text-sm text-muted-foreground">{selectedLab.city}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-patient-navy">Phone</p>
                    <a 
                      href={`tel:${selectedLab.phone}`} 
                      className="text-sm text-patient-teal hover:underline"
                    >
                      {selectedLab.phone}
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-patient-navy">Hours</p>
                    <p className="text-sm text-muted-foreground">{selectedLab.hours}</p>
                  </div>

                  {selectedLab.waitTime && (
                    <div>
                      <p className="text-sm font-medium text-patient-navy">Estimated Wait</p>
                      <p className="text-sm text-muted-foreground">{selectedLab.waitTime}</p>
                    </div>
                  )}
                </div>

                <div className="w-24 h-24 hidden md:block">
                  <img 
                    src={happyChild} 
                    alt="Lab" 
                    className="w-full h-full object-cover rounded-lg opacity-80"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-patient-navy mb-2">Services</p>
                <div className="flex flex-wrap gap-2">
                  {selectedLab.services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="bg-patient-teal/10 text-patient-teal">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-patient-navy mb-2">Accepted Insurance</p>
                <div className="flex flex-wrap gap-2">
                  {selectedLab.insurance.map((ins, index) => (
                    <Badge key={index} variant="outline">
                      {ins}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-patient-teal hover:bg-patient-teal/90"
                onClick={() => handleGetDirections(selectedLab)}
              >
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default FindLabs;
