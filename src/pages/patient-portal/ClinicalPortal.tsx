import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FlaskConical, ClipboardList, Pill, FolderOpen, Download, Eye, RefreshCw, Upload, FileText, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import PatientPortalHeader from '@/components/patient-portal/PatientPortalHeader';
import Footer from '@/components/Footer';
import happyChild from '@/assets/child-grass-happy.jpg';

const ClinicalPortal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Patient';

  const quickAccessTiles = [
    { icon: FlaskConical, title: 'My Lab Results', href: '#labs' },
    { icon: ClipboardList, title: 'Visit Summaries', href: '#visits' },
    { icon: Pill, title: 'Medications', href: '#medications' },
    { icon: FolderOpen, title: 'Documents & Uploads', href: '#documents' },
  ];

  // Sample data - would come from Supabase in production
  const labResults = [
    { id: 1, date: '2024-12-05', test: 'Comprehensive Metabolic Panel', provider: 'Dr. Davallow', status: 'completed' },
    { id: 2, date: '2024-11-20', test: 'Thyroid Function Panel', provider: 'Dr. Davallow', status: 'completed' },
    { id: 3, date: '2024-10-15', test: 'HbA1c', provider: 'Dr. Davallow', status: 'completed' },
  ];

  const visitSummaries = [
    { id: 1, date: '2024-12-01', provider: 'Dr. Ladan Davallow', reason: 'Follow-up: Growth Monitoring', hasReport: true },
    { id: 2, date: '2024-10-15', provider: 'Dr. Ladan Davallow', reason: 'Initial Consultation', hasReport: true },
  ];

  const medications = [
    { id: 1, name: 'Levothyroxine', dose: '50mcg', schedule: 'Once daily, morning', provider: 'Dr. Davallow' },
    { id: 2, name: 'Vitamin D3', dose: '2000 IU', schedule: 'Once daily', provider: 'Dr. Davallow' },
  ];

  const documents = [
    { id: 1, name: 'Lab Results - Dec 2024.pdf', type: 'Labs', date: '2024-12-05', fileType: 'pdf' },
    { id: 2, name: 'Growth Chart.pdf', type: 'Notes', date: '2024-12-01', fileType: 'pdf' },
    { id: 3, name: 'Referral Letter.pdf', type: 'Referrals', date: '2024-10-10', fileType: 'pdf' },
  ];

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
              Clinical Patient Portal
            </h1>
            <p className="text-center text-muted-foreground mt-2">
              View your medical records, lab results, and care summaries
            </p>
          </div>

          {/* Quick Access Tiles */}
          <section className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickAccessTiles.map((tile, index) => (
                <a
                  key={index}
                  href={tile.href}
                  className="group"
                >
                  <Card className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-patient-teal border-2 border-transparent">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-xl bg-patient-teal flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <tile.icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="font-semibold text-patient-navy text-sm md:text-base">{tile.title}</h3>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </section>

          {/* Lab Results Section */}
          <section id="labs" className="mb-8">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-patient-gold" />
                    Lab Results
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {labResults.length > 0 ? (
                  <Accordion type="single" collapsible className="space-y-2">
                    {labResults.map((lab) => (
                      <AccordionItem key={lab.id} value={`lab-${lab.id}`} className="border rounded-xl px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-left w-full">
                            <span className="text-sm text-muted-foreground min-w-[100px]">{lab.date}</span>
                            <span className="font-medium text-patient-navy flex-1">{lab.test}</span>
                            <span className="text-sm text-muted-foreground">{lab.provider}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-4 pb-2 flex flex-wrap gap-3">
                            <Button size="sm" className="bg-patient-teal hover:bg-patient-teal/90">
                              <Eye className="h-4 w-4 mr-2" />
                              View Full Report
                            </Button>
                            <Button size="sm" variant="outline" className="border-patient-navy text-patient-navy">
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-8">
                    <img src={happyChild} alt="Happy child" className="w-32 h-32 object-cover rounded-full mx-auto mb-4 opacity-80" />
                    <p className="text-muted-foreground">No recent labs found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Visit Summaries Section */}
          <section id="visits" className="mb-8">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-patient-gold" />
                  Visit Summaries
                </CardTitle>
              </CardHeader>
              <CardContent>
                {visitSummaries.length > 0 ? (
                  <div className="grid gap-4">
                    {visitSummaries.map((visit) => (
                      <Card key={visit.id} className="border-l-4 border-l-patient-teal">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <p className="font-semibold text-patient-navy">{visit.reason}</p>
                              <p className="text-sm text-muted-foreground">{visit.provider}</p>
                              <p className="text-sm text-muted-foreground">{visit.date}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-patient-teal hover:bg-patient-teal/90">
                                <Eye className="h-4 w-4 mr-2" />
                                View Summary
                              </Button>
                              <Button size="sm" variant="outline" className="border-patient-navy text-patient-navy">
                                <Download className="h-4 w-4 mr-2" />
                                PDF
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <img src={happyChild} alt="Happy child" className="w-32 h-32 object-cover rounded-full mx-auto mb-4 opacity-80" />
                    <p className="text-muted-foreground">No visit summaries yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Medications Section */}
          <section id="medications" className="mb-8">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
                  <Pill className="h-5 w-5 text-patient-gold" />
                  Active Medications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {medications.length > 0 ? (
                  <div className="space-y-4">
                    {medications.map((med) => (
                      <div key={med.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-patient-bg rounded-xl">
                        <div className="space-y-1">
                          <p className="font-semibold text-patient-navy">{med.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {med.dose} • {med.schedule}
                          </p>
                          <p className="text-xs text-muted-foreground">Prescribed by {med.provider}</p>
                        </div>
                        <Button size="sm" variant="outline" className="mt-3 md:mt-0 border-patient-teal text-patient-teal hover:bg-patient-teal hover:text-white">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Request Refill
                        </Button>
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
          </section>

          {/* Documents Section */}
          <section id="documents" className="mb-8">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-patient-gold" />
                    Documents & Uploads
                  </CardTitle>
                  <Button size="sm" className="bg-patient-teal hover:bg-patient-teal/90">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New File
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {documents.length > 0 ? (
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 bg-patient-bg rounded-xl">
                        <div className="flex items-center gap-4">
                          {doc.fileType === 'pdf' ? (
                            <FileText className="h-8 w-8 text-red-500" />
                          ) : (
                            <Image className="h-8 w-8 text-patient-teal" />
                          )}
                          <div>
                            <p className="font-medium text-patient-navy">{doc.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">{doc.type}</Badge>
                              <span className="text-xs text-muted-foreground">{doc.date}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="text-patient-navy">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <img src={happyChild} alt="Happy child" className="w-32 h-32 object-cover rounded-full mx-auto mb-4 opacity-80" />
                    <p className="text-muted-foreground">No documents yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClinicalPortal;
