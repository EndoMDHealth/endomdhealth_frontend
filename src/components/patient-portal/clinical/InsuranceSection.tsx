import { useState } from 'react';
import { Shield, Upload, CheckCircle, AlertCircle, FileText, Trash2, Eye, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import happyChild from '@/assets/child-grass-happy.jpg';

const InsuranceSection = () => {
  const [insurancePlans] = useState([
    {
      id: 1,
      name: 'Anthem Blue Cross Blue Shield',
      type: 'Primary',
      memberId: 'XYZ123456789',
      groupNumber: 'GRP-567890',
      effectiveDate: '2024-01-01',
      verified: true,
      coverage: {
        deductible: '$1,500',
        deductibleMet: '$1,200',
        copay: '$30',
        coinsurance: '20%',
        outOfPocketMax: '$5,000',
      },
    },
  ]);

  const [documents] = useState([
    { id: 1, name: 'Insurance Card - Front.pdf', uploadDate: '2024-01-15', type: 'card' },
    { id: 2, name: 'Insurance Card - Back.pdf', uploadDate: '2024-01-15', type: 'card' },
    { id: 3, name: 'EOB - December 2024.pdf', uploadDate: '2024-12-05', type: 'eob' },
  ]);

  const handleUpload = () => {
    toast.info('Upload functionality coming soon');
  };

  const handleViewDocument = (docName: string) => {
    toast.info(`Opening ${docName}`);
  };

  return (
    <div className="space-y-6">
      {/* Active Insurance Plans */}
      {insurancePlans.map((plan) => (
        <Card key={plan.id} className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
                <Shield className="h-5 w-5 text-patient-gold" />
                {plan.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-patient-navy border-patient-navy/20">
                  {plan.type}
                </Badge>
                {plan.verified ? (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge className="bg-patient-gold/20 text-amber-700 hover:bg-patient-gold/20">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Pending Verification
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-patient-bg rounded-xl">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Member ID</p>
                <p className="font-semibold text-patient-navy mt-1">{plan.memberId}</p>
              </div>
              <div className="p-4 bg-patient-bg rounded-xl">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Group Number</p>
                <p className="font-semibold text-patient-navy mt-1">{plan.groupNumber}</p>
              </div>
              <div className="p-4 bg-patient-bg rounded-xl">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Effective Date</p>
                <p className="font-semibold text-patient-navy mt-1">{plan.effectiveDate}</p>
              </div>
              <div className="p-4 bg-patient-bg rounded-xl">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Copay</p>
                <p className="font-semibold text-patient-navy mt-1">{plan.coverage.copay}</p>
              </div>
            </div>

            {/* Coverage Details */}
            <div className="border-t pt-6">
              <h4 className="font-semibold text-patient-navy mb-4 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-patient-gold" />
                Coverage Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-patient-teal/5 rounded-xl border border-patient-teal/10">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Deductible</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className="font-semibold text-patient-navy">{plan.coverage.deductibleMet}</p>
                    <p className="text-sm text-muted-foreground">of {plan.coverage.deductible}</p>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-patient-teal rounded-full"
                      style={{ width: `${(parseFloat(plan.coverage.deductibleMet.replace('$', '').replace(',', '')) / parseFloat(plan.coverage.deductible.replace('$', '').replace(',', ''))) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="p-4 bg-patient-teal/5 rounded-xl border border-patient-teal/10">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Coinsurance</p>
                  <p className="font-semibold text-patient-navy mt-1">{plan.coverage.coinsurance}</p>
                  <p className="text-xs text-muted-foreground mt-1">After deductible is met</p>
                </div>
                <div className="p-4 bg-patient-teal/5 rounded-xl border border-patient-teal/10">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Out-of-Pocket Max</p>
                  <p className="font-semibold text-patient-navy mt-1">{plan.coverage.outOfPocketMax}</p>
                  <p className="text-xs text-muted-foreground mt-1">Annual maximum</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Upload Documents */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
              <FileText className="h-5 w-5 text-patient-gold" />
              Insurance Documents
            </CardTitle>
            <Button onClick={handleUpload} className="bg-patient-teal hover:bg-patient-teal/90">
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {documents.length > 0 ? (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-patient-bg rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-patient-teal/10">
                      <FileText className="h-5 w-5 text-patient-teal" />
                    </div>
                    <div>
                      <p className="font-medium text-patient-navy">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">Uploaded {doc.uploadDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDocument(doc.name)}
                      className="text-patient-teal hover:bg-patient-teal/10"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <img src={happyChild} alt="Happy child" className="w-32 h-32 object-cover rounded-full mx-auto mb-4 opacity-80" />
              <p className="text-muted-foreground mb-4">No insurance documents uploaded</p>
              <Button onClick={handleUpload} className="bg-patient-teal hover:bg-patient-teal/90">
                <Upload className="h-4 w-4 mr-2" />
                Upload Your First Document
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceSection;
