import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, FileText, Plus, Check, AlertCircle, Trash2, Star, Download, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import PatientPortalHeader from '@/components/patient-portal/PatientPortalHeader';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import happyChild from '@/assets/child-grass-happy.jpg';

const ManageInvoices = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Patient';

  // Sample data
  const [invoices] = useState([
    { id: 'INV-2024-001', date: '2024-12-05', amount: 150.00, status: 'unpaid', dueDate: '2024-12-20' },
    { id: 'INV-2024-002', date: '2024-11-15', amount: 75.00, status: 'paid', dueDate: '2024-11-30' },
    { id: 'INV-2024-003', date: '2024-10-20', amount: 200.00, status: 'paid', dueDate: '2024-11-05' },
    { id: 'INV-2024-004', date: '2024-12-01', amount: 50.00, status: 'overdue', dueDate: '2024-12-08' },
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'visa', last4: '4242', expiry: '12/26', isDefault: true },
    { id: 2, type: 'mastercard', last4: '8888', expiry: '06/25', isDefault: false },
  ]);

  const billingStats = {
    totalBilled: 475.00,
    totalPaid: 275.00,
    outstanding: 200.00,
  };

  const handlePayNow = (invoiceId: string) => {
    toast.success(`Payment initiated for ${invoiceId}`);
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(prev => prev.map(pm => ({ ...pm, isDefault: pm.id === id })));
    toast.success('Default payment method updated');
  };

  const handleRemoveCard = (id: number) => {
    setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
    toast.success('Payment method removed');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Paid</Badge>;
      case 'unpaid':
        return <Badge className="bg-patient-teal/20 text-patient-teal hover:bg-patient-teal/20">Unpaid</Badge>;
      case 'overdue':
        return <Badge className="bg-patient-gold/20 text-amber-700 hover:bg-patient-gold/20">Overdue</Badge>;
      default:
        return null;
    }
  };

  const hasOverdue = invoices.some(inv => inv.status === 'overdue');

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
              Manage Invoices & Payment Methods
            </h1>
            <p className="text-center text-muted-foreground mt-2">
              View invoices, make payments, and manage your payment methods
            </p>
          </div>

          {/* Friendly Overdue Reminder */}
          {hasOverdue && (
            <Card className="mb-6 border-patient-gold bg-patient-gold/10">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex-shrink-0">
                  <img src={happyChild} alt="Friendly reminder" className="w-16 h-16 object-cover rounded-full" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-patient-navy">Friendly Reminder</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    You have overdue invoices. Please review and make a payment at your earliest convenience.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Billing Summary */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-patient-navy">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-patient-navy/10 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-patient-navy" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Billed</p>
                      <p className="text-2xl font-bold text-patient-navy">${billingStats.totalBilled.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Paid</p>
                      <p className="text-2xl font-bold text-green-600">${billingStats.totalPaid.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-patient-gold">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-patient-gold/20 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Outstanding</p>
                      <p className="text-2xl font-bold text-amber-600">${billingStats.outstanding.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Invoices Table */}
          <section className="mb-8">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
                  <FileText className="h-5 w-5 text-patient-gold" />
                  Invoices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-patient-navy">Invoice #</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-patient-navy">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-patient-navy">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-patient-navy">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-patient-navy">Due Date</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-patient-navy">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b last:border-0 hover:bg-patient-bg/50">
                          <td className="py-4 px-4 font-medium text-patient-navy">{invoice.id}</td>
                          <td className="py-4 px-4 text-muted-foreground">{invoice.date}</td>
                          <td className="py-4 px-4 font-semibold text-patient-navy">${invoice.amount.toFixed(2)}</td>
                          <td className="py-4 px-4">{getStatusBadge(invoice.status)}</td>
                          <td className="py-4 px-4 text-muted-foreground">{invoice.dueDate}</td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button size="sm" variant="ghost" className="text-patient-navy">
                                <Download className="h-4 w-4" />
                              </Button>
                              {invoice.status !== 'paid' && (
                                <Button
                                  size="sm"
                                  className="bg-patient-teal hover:bg-patient-teal/90"
                                  onClick={() => handlePayNow(invoice.id)}
                                >
                                  Pay Now
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Payment Methods */}
          <section className="mb-8">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-patient-gold" />
                    Payment Methods
                  </CardTitle>
                  <Button size="sm" className="bg-patient-teal hover:bg-patient-teal/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Card
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-colors ${
                        method.isDefault ? 'border-patient-teal bg-patient-teal/5' : 'border-transparent bg-patient-bg'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gradient-to-br from-patient-navy to-patient-navy/80 rounded flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-patient-navy capitalize">
                            {method.type} •••• {method.last4}
                          </p>
                          <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                        </div>
                        {method.isDefault && (
                          <Badge className="bg-patient-teal/20 text-patient-teal hover:bg-patient-teal/20">
                            <Star className="h-3 w-3 mr-1" />
                            Default
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {!method.isDefault && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-patient-teal text-patient-teal hover:bg-patient-teal hover:text-white"
                            onClick={() => handleSetDefault(method.id)}
                          >
                            Set as Default
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleRemoveCard(method.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ManageInvoices;