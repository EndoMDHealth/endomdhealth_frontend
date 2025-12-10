import { Calendar, Clock, DollarSign, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AccountSummary = () => {
  // Mock data - in production this would come from the database
  const accountData = {
    lastVisit: {
      date: 'November 15, 2024',
      time: '2:30 PM',
      provider: 'Dr. Davallow',
    },
    nextAppointment: {
      date: 'December 20, 2024',
      time: '10:00 AM',
      type: 'Follow-up Visit',
    },
    billing: {
      outstandingBalance: 125.00,
      dueDate: 'December 31, 2024',
    },
  };

  return (
    <section className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Account Summary Card */}
        <Card className="border-2 border-patient-teal/20 shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-patient-navy text-white pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-patient-gold" />
              Account Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Last Visit */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-patient-teal/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-patient-teal" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Last Visit</p>
                <p className="text-patient-navy font-semibold">{accountData.lastVisit.date}</p>
                <p className="text-sm text-muted-foreground">
                  {accountData.lastVisit.time} • {accountData.lastVisit.provider}
                </p>
              </div>
            </div>

            {/* Next Appointment */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-patient-gold/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-6 w-6 text-patient-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Next Appointment</p>
                {accountData.nextAppointment ? (
                  <>
                    <p className="text-patient-navy font-semibold">{accountData.nextAppointment.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {accountData.nextAppointment.time} • {accountData.nextAppointment.type}
                    </p>
                  </>
                ) : (
                  <p className="text-muted-foreground italic">No upcoming appointments</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Status Card */}
        <Card className="border-2 border-patient-gold/20 shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-patient-navy text-white pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5 text-patient-gold" />
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Outstanding Balance */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-patient-teal/10 flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-6 w-6 text-patient-teal" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Outstanding Balance</p>
                {accountData.billing.outstandingBalance > 0 ? (
                  <p className="text-2xl font-bold text-patient-navy">
                    ${accountData.billing.outstandingBalance.toFixed(2)}
                  </p>
                ) : (
                  <p className="text-patient-teal font-semibold">No balance due ✓</p>
                )}
              </div>
            </div>

            {/* Due Date */}
            {accountData.billing.outstandingBalance > 0 && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-patient-gold/10 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-patient-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Due Date</p>
                  <p className="text-patient-navy font-semibold">{accountData.billing.dueDate}</p>
                  <button className="mt-2 text-sm text-patient-teal hover:underline font-medium">
                    Pay Now →
                  </button>
                </div>
              </div>
            )}

            {accountData.billing.outstandingBalance === 0 && (
              <div className="flex items-center justify-center py-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-patient-teal/10 flex items-center justify-center">
                    <span className="text-3xl">🎉</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Your account is in good standing!</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AccountSummary;
