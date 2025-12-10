import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, CloudUpload, File, X, Check, AlertCircle, FileText, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import PatientPortalHeader from '@/components/patient-portal/PatientPortalHeader';
import Footer from '@/components/Footer';
import happyChild from '@/assets/child-grass-happy.jpg';

interface UploadedFile {
  file: File;
  id: string;
  preview?: string;
}

const UploadLabs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Patient';

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [documentType, setDocumentType] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const acceptedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };

  const processFiles = (selectedFiles: File[]) => {
    const validFiles: UploadedFile[] = [];

    selectedFiles.forEach((file) => {
      if (!acceptedTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported file type`);
        return;
      }
      if (file.size > maxFileSize) {
        toast.error(`${file.name} exceeds the 10MB size limit`);
        return;
      }

      const uploadedFile: UploadedFile = {
        file,
        id: Math.random().toString(36).substring(7),
      };

      if (file.type.startsWith('image/')) {
        uploadedFile.preview = URL.createObjectURL(file);
      }

      validFiles.push(uploadedFile);
    });

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one file to upload');
      return;
    }
    if (!documentType) {
      toast.error('Please select a document type');
      return;
    }

    setIsUploading(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsUploading(false);
    setUploadComplete(true);
    toast.success('Files uploaded successfully!');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (uploadComplete) {
    return (
      <div className="min-h-screen bg-patient-bg flex flex-col">
        <PatientPortalHeader firstName={firstName} />
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="p-8">
                <img 
                  src={happyChild} 
                  alt="Happy child" 
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-6"
                />
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-patient-navy mb-2">Thank You!</h2>
                <p className="text-muted-foreground mb-6">
                  Your file has been securely uploaded. Our team will review it shortly.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setUploadComplete(false);
                      setFiles([]);
                      setDocumentType('');
                    }}
                    className="border-patient-teal text-patient-teal"
                  >
                    Upload Another
                  </Button>
                  <Button 
                    onClick={() => navigate('/patient-dashboard')}
                    className="bg-patient-teal hover:bg-patient-teal/90"
                  >
                    Return to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              Upload Labs or Imaging
            </h1>
            <p className="text-center text-muted-foreground mt-2">
              Securely upload your medical documents
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* Instructions Box */}
            <Card className="border-patient-gold bg-patient-gold/10">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-patient-gold flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-patient-navy">Upload Guidelines</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Accepted file types: PDF, JPG, PNG</li>
                      <li>• Maximum file size: 10MB per file</li>
                      <li>• Your files are encrypted and HIPAA-compliant</li>
                      <li>• Our team will review within 1-2 business days</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload Area */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
                  <Upload className="h-5 w-5 text-patient-gold" />
                  Upload Files
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Drag & Drop Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    isDragging 
                      ? 'border-patient-teal bg-patient-teal/5' 
                      : 'border-patient-teal/50 hover:border-patient-teal'
                  }`}
                >
                  <CloudUpload className="h-12 w-12 text-patient-teal mx-auto mb-4" />
                  <p className="text-patient-navy font-medium mb-2">
                    Drag and drop files here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">or</p>
                  <label>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      className="bg-patient-teal hover:bg-patient-teal/90"
                      onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                    >
                      Choose Files
                    </Button>
                  </label>
                </div>

                {/* Uploaded Files Preview */}
                {files.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-patient-navy">Selected Files</h4>
                    {files.map((uploadedFile) => (
                      <div
                        key={uploadedFile.id}
                        className="flex items-center justify-between p-4 bg-patient-bg rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          {uploadedFile.preview ? (
                            <img
                              src={uploadedFile.preview}
                              alt="Preview"
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          ) : uploadedFile.file.type === 'application/pdf' ? (
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                              <FileText className="h-6 w-6 text-red-500" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-patient-teal/10 rounded-lg flex items-center justify-center">
                              <Image className="h-6 w-6 text-patient-teal" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-patient-navy text-sm truncate max-w-[200px]">
                              {uploadedFile.file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(uploadedFile.file.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(uploadedFile.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Document Type Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-patient-navy">
                    Document Type
                  </label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lab-report">Lab Report</SelectItem>
                      <SelectItem value="imaging">Imaging (X-ray/MRI/Ultrasound)</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="other">Other Medical File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={files.length === 0 || !documentType || isUploading}
                  className="w-full bg-patient-teal hover:bg-patient-teal/90"
                  size="lg"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5 mr-2" />
                      Upload Files
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UploadLabs;
