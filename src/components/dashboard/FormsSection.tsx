import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, FileText, ClipboardList, Stethoscope } from "lucide-react";
import { generateEConsultPDF } from "@/utils/generateEConsultPDF";
import { toast } from "sonner";

const formTemplates = [
  {
    id: 'econsult-blank',
    title: 'E-Consult Request Form',
    description: 'Blank e-consult submission form for new patient referrals',
    icon: ClipboardList,
    type: 'blank'
  },
  {
    id: 'patient-intake',
    title: 'Patient Intake Form',
    description: 'Pre-visit patient information and medical history form',
    icon: FileText,
    type: 'template'
  },
  {
    id: 'clinical-summary',
    title: 'Clinical Summary Template',
    description: 'Template for summarizing patient clinical information',
    icon: Stethoscope,
    type: 'template'
  },
];

export const FormsSection = () => {
  const handleDownloadBlankForm = () => {
    // Generate a blank e-consult PDF
    const blankConsult = {
      id: 'BLANK-FORM-TEMPLATE',
      patientInitials: '____',
      patientAge: 0,
      conditionCategory: 'other',
      clinicalQuestion: '',
      additionalNotes: '',
      status: 'submitted',
      createdAt: new Date().toISOString(),
    };

    generateEConsultPDF(blankConsult);
    toast.success('Blank e-consult form downloaded');
  };

  const handleDownloadTemplate = (templateId: string) => {
    toast.info('Template download coming soon');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Forms & Templates</h2>
        <p className="text-muted-foreground">
          Download fillable forms and templates for e-consult submissions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formTemplates.map((form) => {
          const Icon = form.icon;
          return (
            <Card key={form.id} className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-lg mt-4">{form.title}</CardTitle>
                <CardDescription>{form.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => form.type === 'blank' ? handleDownloadBlankForm() : handleDownloadTemplate(form.id)}
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
              <FileText className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Need a custom form?</h3>
              <p className="text-sm text-muted-foreground">
                Contact support to request additional form templates for your practice.
              </p>
            </div>
            <Button variant="outline">Contact Support</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
