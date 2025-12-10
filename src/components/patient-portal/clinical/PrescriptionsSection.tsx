import { useState } from 'react';
import { Pill, RefreshCw, Clock, Building2, MapPin, Edit, CheckCircle, AlertCircle, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import happyChild from '@/assets/child-grass-happy.jpg';

const PrescriptionsSection = () => {
  const [preferredPharmacy, setPreferredPharmacy] = useState({
    name: 'CVS Pharmacy',
    address: '123 Main Street, Springfield, VA 22150',
    phone: '(703) 555-1234',
  });
  const [isEditingPharmacy, setIsEditingPharmacy] = useState(false);
  const [editPharmacy, setEditPharmacy] = useState(preferredPharmacy);

  const activeMedications = [
    { id: 1, name: 'Levothyroxine', dose: '50mcg', frequency: 'Once daily, morning', prescriber: 'Dr. Davallow', lastFilled: '2024-11-15', refillsLeft: 3, status: 'active' },
    { id: 2, name: 'Vitamin D3', dose: '2000 IU', frequency: 'Once daily', prescriber: 'Dr. Davallow', lastFilled: '2024-10-20', refillsLeft: 5, status: 'active' },
    { id: 3, name: 'Growth Hormone', dose: '0.3mg', frequency: 'Nightly injection', prescriber: 'Dr. Davallow', lastFilled: '2024-12-01', refillsLeft: 1, status: 'low' },
  ];

  const prescriptionHistory = [
    { id: 1, name: 'Metformin', dose: '500mg', frequency: 'Twice daily', prescriber: 'Dr. Davallow', startDate: '2024-01-15', endDate: '2024-06-15', status: 'completed' },
    { id: 2, name: 'Vitamin D3', dose: '1000 IU', frequency: 'Once daily', prescriber: 'Dr. Davallow', startDate: '2024-03-01', endDate: '2024-09-01', status: 'completed' },
  ];

  const handleSavePharmacy = () => {
    setPreferredPharmacy(editPharmacy);
    setIsEditingPharmacy(false);
    toast.success('Preferred pharmacy updated successfully');
  };

  const handleRefillRequest = (medName: string) => {
    toast.success(`Refill request submitted for ${medName}`);
  };

  return (
    <div className="space-y-6">
      {/* Preferred Pharmacy Card */}
      <Card className="border-0 shadow-sm bg-patient-gold/5">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
              <Building2 className="h-5 w-5 text-patient-gold" />
              Preferred Pharmacy
            </CardTitle>
            {!isEditingPharmacy && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditPharmacy(preferredPharmacy);
                  setIsEditingPharmacy(true);
                }}
                className="text-patient-teal border-patient-teal hover:bg-patient-teal hover:text-white"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isEditingPharmacy ? (
            <div className="space-y-3">
              <div>
                <Label className="text-patient-navy text-sm">Pharmacy Name</Label>
                <Input
                  value={editPharmacy.name}
                  onChange={(e) => setEditPharmacy({ ...editPharmacy, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-patient-navy text-sm">Address</Label>
                <Input
                  value={editPharmacy.address}
                  onChange={(e) => setEditPharmacy({ ...editPharmacy, address: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-patient-navy text-sm">Phone</Label>
                <Input
                  value={editPharmacy.phone}
                  onChange={(e) => setEditPharmacy({ ...editPharmacy, phone: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-patient-teal hover:bg-patient-teal/90" onClick={handleSavePharmacy}>
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditingPharmacy(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-patient-teal/10">
                <Building2 className="h-6 w-6 text-patient-teal" />
              </div>
              <div>
                <p className="font-semibold text-patient-navy">{preferredPharmacy.name}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {preferredPharmacy.address}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{preferredPharmacy.phone}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Medications Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="bg-white rounded-xl p-1 shadow-sm border border-gray-100">
          <TabsTrigger value="active" className="data-[state=active]:bg-patient-teal/10 data-[state=active]:text-patient-teal rounded-lg">
            <Pill className="h-4 w-4 text-patient-gold mr-2" />
            Active Medications
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-patient-teal/10 data-[state=active]:text-patient-teal rounded-lg">
            <History className="h-4 w-4 text-patient-gold mr-2" />
            Prescription History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              {activeMedications.length > 0 ? (
                <div className="space-y-4">
                  {activeMedications.map((med) => (
                    <div
                      key={med.id}
                      className={`p-4 rounded-xl border-l-4 ${
                        med.status === 'low' ? 'border-l-patient-gold bg-patient-gold/5' : 'border-l-patient-teal bg-patient-bg'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg ${med.status === 'low' ? 'bg-patient-gold/20' : 'bg-patient-teal/10'}`}>
                            <Pill className={`h-5 w-5 ${med.status === 'low' ? 'text-patient-gold' : 'text-patient-teal'}`} />
                          </div>
                          <div>
                            <p className="font-semibold text-patient-navy">{med.name}</p>
                            <p className="text-sm text-muted-foreground">{med.dose} • {med.frequency}</p>
                            <p className="text-xs text-muted-foreground mt-1">Prescribed by {med.prescriber}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Last filled: {med.lastFilled}
                              </span>
                              {med.status === 'low' ? (
                                <Badge className="bg-patient-gold/20 text-amber-700 hover:bg-patient-gold/20">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  {med.refillsLeft} refill left
                                </Badge>
                              ) : (
                                <Badge className="bg-patient-teal/20 text-patient-teal hover:bg-patient-teal/20">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  {med.refillsLeft} refills left
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleRefillRequest(med.name)}
                          className="bg-patient-teal hover:bg-patient-teal/90"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Request Refill
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <img src={happyChild} alt="Happy child" className="w-32 h-32 object-cover rounded-full mx-auto mb-4 opacity-80" />
                  <p className="text-muted-foreground">No active medications</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              {prescriptionHistory.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-4 text-sm font-medium text-patient-navy">Medication</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-patient-navy">Dosage</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-patient-navy">Duration</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-patient-navy">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescriptionHistory.map((med, index) => (
                        <tr key={med.id} className={index % 2 === 0 ? 'bg-patient-bg' : 'bg-white'}>
                          <td className="py-3 px-4">
                            <p className="font-medium text-patient-navy">{med.name}</p>
                            <p className="text-xs text-muted-foreground">{med.frequency}</p>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{med.dose}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {med.startDate} – {med.endDate}
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                              Completed
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <img src={happyChild} alt="Happy child" className="w-32 h-32 object-cover rounded-full mx-auto mb-4 opacity-80" />
                  <p className="text-muted-foreground">No prescription history</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PrescriptionsSection;
