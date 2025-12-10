import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Receipt, CreditCard, Settings, Download, Plus, Check, Trash2, Star, Mail, Phone, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import PatientPortalHeader from '@/components/patient-portal/PatientPortalHeader';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const BillingAccount = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Patient';

  const [autoPay, setAutoPay] = useState(true);
  const [emailReminders, setEmailReminders] = useState(true);
  const [smsReminders, setSmsReminders] = useState(false);
  const [billingEmail, setBillingEmail] = useState(user?.email || '');
  const [billingPhone, setBillingPhone] = useState('');

  // Sample data
  const accountOverview = {
    currentBalance: 200.00,
    lastPayment: { amount: 75.00, date: '2024-11-30' },
    outstandingInvoices: 2,
  };

  const recentTransactions = [
    { id: 1, date: '2024-11-30', description: 'Payment - Invoice INV-2024-002', amount: -75.00, type: 'payment' },
    { id: 2, date: '2024-11-15', description: 'Office Visit - Dr. Davallow', amount: 150.00, type: 'charge' },
    { id: 3, date: '2024-10-25', description: 'Payment - Invoice INV-2024-003', amount: -200.00, type: 'payment' },
    { id: 4, date: '2024-10-20', description: 'Lab Work', amount: 75.00, type: 'charge' },
  ];

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'visa', last4: '4242', expiry: '12/26', isDefault: true },
    { id: 2, type: 'mastercard', last4: '8888', expiry: '06/25', isDefault: false },
  ]);

  const statements = [
    { id: 1, period: 'November 2024', date: '2024-12-01' },
    { id: 2, period: 'October 2024', date: '2024-11-01' },
    { id: 3, period: 'September 2024', date: '2024-10-01' },
  ];

  const handleSetDefault = (id: number) => {
    setPaymentMethods(prev => prev.map(pm => ({ ...pm, isDefault: pm.id === id })));
    toast.success('Default payment method updated');
  };

  const handleRemoveCard = (id: number) => {
    setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
    toast.success('Payment method removed');
  };

  const handleSavePreferences = () => {
    toast.success('Billing preferences saved');
  };

  const handleDownloadStatement = (period: string) => {
    toast.info(`Downloading statement for ${period}`);
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
              Manage My Billing Account
            </h1>
            <p className="text-center text-muted-foreground mt-2">
              View your balance, manage payments, and update billing preferences
            </p>
          </div>

          {/* Account Overview */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-patient-navy">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
                  <p className="text-3xl font-bold text-patient-navy">${accountOverview.currentBalance.toFixed(2)}</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground mb-1">Last Payment</p>
                  <p className="text-xl font-bold text-green-600">${accountOverview.lastPayment.amount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">{accountOverview.lastPayment.date}</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-patient-gold">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground mb-1">Outstanding Invoices</p>
                  <p className="text-3xl font-bold text-amber-600">{accountOverview.outstandingInvoices}</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Transactions */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-patient-gold" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-patient-bg rounded-xl">
                      <div>
                        <p className="font-medium text-patient-navy text-sm">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                      <span
                        className={`font-semibold ${
                          tx.type === 'payment' ? 'text-green-600' : 'text-patient-navy'
                        }`}
                      >
                        {tx.type === 'payment' ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-patient-gold" />
                    Payment Methods
                  </CardTitle>
                  <Button size="sm" className="bg-patient-teal hover:bg-patient-teal/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Card
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 ${
                        method.isDefault ? 'border-patient-teal bg-patient-teal/5' : 'border-transparent bg-patient-bg'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-gradient-to-br from-patient-navy to-patient-navy/80 rounded flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-patient-navy text-sm capitalize">
                            {method.type} •••• {method.last4}
                          </p>
                          <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                        </div>
                        {method.isDefault && (
                          <Badge className="bg-patient-teal/20 text-patient-teal hover:bg-patient-teal/20 text-xs">
                            <Star className="h-2 w-2 mr-1" />
                            Default
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {!method.isDefault && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-patient-teal hover:bg-patient-teal/10 text-xs"
                            onClick={() => handleSetDefault(method.id)}
                          >
                            Set Default
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:bg-red-50"
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

            {/* Billing Preferences */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
                  <Settings className="h-5 w-5 text-patient-gold" />
                  Billing Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-patient-navy font-medium">Auto-Pay</Label>
                    <p className="text-xs text-muted-foreground">Automatically pay invoices when due</p>
                  </div>
                  <Switch checked={autoPay} onCheckedChange={setAutoPay} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-patient-navy font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email Reminders
                    </Label>
                    <p className="text-xs text-muted-foreground">Receive payment reminders via email</p>
                  </div>
                  <Switch checked={emailReminders} onCheckedChange={setEmailReminders} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-patient-navy font-medium flex items-center gap-2">
                      <Bell className="h-4 w-4" /> SMS Reminders
                    </Label>
                    <p className="text-xs text-muted-foreground">Receive payment reminders via text</p>
                  </div>
                  <Switch checked={smsReminders} onCheckedChange={setSmsReminders} />
                </div>
                <div className="space-y-3 pt-4 border-t">
                  <div>
                    <Label className="text-patient-navy font-medium">Billing Email</Label>
                    <Input
                      value={billingEmail}
                      onChange={(e) => setBillingEmail(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-patient-navy font-medium">Billing Phone</Label>
                    <Input
                      value={billingPhone}
                      onChange={(e) => setBillingPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      className="mt-1"
                    />
                  </div>
                  <Button
                    className="w-full bg-patient-teal hover:bg-patient-teal/90"
                    onClick={handleSavePreferences}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Downloadable Statements */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
                  <Download className="h-5 w-5 text-patient-gold" />
                  Downloadable Statements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {statements.map((stmt) => (
                    <div key={stmt.id} className="flex items-center justify-between p-4 bg-patient-bg rounded-xl">
                      <div>
                        <p className="font-medium text-patient-navy">{stmt.period}</p>
                        <p className="text-xs text-muted-foreground">Generated {stmt.date}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-patient-navy text-patient-navy hover:bg-patient-navy hover:text-white"
                        onClick={() => handleDownloadStatement(stmt.period)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BillingAccount;