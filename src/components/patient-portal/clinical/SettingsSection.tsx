import { useState } from 'react';
import { Settings, Shield, Bell, Monitor, Smartphone, Lock, Eye, EyeOff, Check, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const SettingsSection = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    appointmentReminders: true,
    labResults: true,
    prescriptionRefills: true,
    newsletters: false,
  });
  const [displaySettings, setDisplaySettings] = useState({
    theme: 'light',
    fontSize: 'medium',
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const linkedDevices = [
    { id: 1, name: 'iPhone 14 Pro', lastActive: '2024-12-10, 10:30 AM', current: true },
    { id: 2, name: 'MacBook Pro', lastActive: '2024-12-09, 3:45 PM', current: false },
  ];

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    toast.success('Password updated successfully');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast.success(twoFactorEnabled ? '2FA disabled' : '2FA enabled successfully');
  };

  const handleRemoveDevice = (deviceId: number) => {
    toast.success('Device removed successfully');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved');
  };

  return (
    <div className="space-y-6">
      {/* Account Security */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
            <Shield className="h-5 w-5 text-patient-gold" />
            Account Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Change */}
          <div className="pb-6 border-b">
            <h4 className="font-medium text-patient-navy mb-4 flex items-center gap-2">
              <Lock className="h-4 w-4 text-patient-gold" />
              Change Password
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-patient-navy text-sm">Current Password</Label>
                <div className="relative mt-1">
                  <Input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-patient-navy"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <Label className="text-patient-navy text-sm">New Password</Label>
                <div className="relative mt-1">
                  <Input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-patient-navy"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <Label className="text-patient-navy text-sm">Confirm New Password</Label>
                <Input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  placeholder="••••••••"
                  className="mt-1"
                />
              </div>
            </div>
            <Button onClick={handlePasswordChange} className="mt-4 bg-patient-teal hover:bg-patient-teal/90">
              Update Password
            </Button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between p-4 bg-patient-bg rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-patient-gold/10">
                <Shield className="h-5 w-5 text-patient-gold" />
              </div>
              <div>
                <p className="font-medium text-patient-navy">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {twoFactorEnabled && (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  <Check className="h-3 w-3 mr-1" />
                  Enabled
                </Badge>
              )}
              <Switch checked={twoFactorEnabled} onCheckedChange={handleEnable2FA} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
            <Bell className="h-5 w-5 text-patient-gold" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b">
            <div className="flex items-center justify-between p-3 bg-patient-bg rounded-xl">
              <span className="text-sm text-patient-navy">Email Notifications</span>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-patient-bg rounded-xl">
              <span className="text-sm text-patient-navy">SMS Notifications</span>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-patient-bg rounded-xl">
              <span className="text-sm text-patient-navy">Push Notifications</span>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-patient-navy">Notify me about:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-3 bg-patient-bg rounded-xl">
                <span className="text-sm text-muted-foreground">Appointment Reminders</span>
                <Switch
                  checked={notifications.appointmentReminders}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, appointmentReminders: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-patient-bg rounded-xl">
                <span className="text-sm text-muted-foreground">Lab Results Available</span>
                <Switch
                  checked={notifications.labResults}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, labResults: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-patient-bg rounded-xl">
                <span className="text-sm text-muted-foreground">Prescription Refills</span>
                <Switch
                  checked={notifications.prescriptionRefills}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, prescriptionRefills: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-patient-bg rounded-xl">
                <span className="text-sm text-muted-foreground">Health Tips & Newsletters</span>
                <Switch
                  checked={notifications.newsletters}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, newsletters: checked })}
                />
              </div>
            </div>
          </div>

          <Button onClick={handleSaveNotifications} className="bg-patient-teal hover:bg-patient-teal/90">
            Save Preferences
          </Button>
        </CardContent>
      </Card>

      {/* Display Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
            <Monitor className="h-5 w-5 text-patient-gold" />
            Display Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-patient-navy text-sm">Theme</Label>
              <Select value={displaySettings.theme} onValueChange={(value) => setDisplaySettings({ ...displaySettings, theme: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-patient-navy text-sm">Font Size</Label>
              <Select value={displaySettings.fontSize} onValueChange={(value) => setDisplaySettings({ ...displaySettings, fontSize: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Linked Devices */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-patient-gold" />
            Linked Devices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {linkedDevices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-4 bg-patient-bg rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-patient-teal/10">
                    <Smartphone className="h-5 w-5 text-patient-teal" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-patient-navy">{device.name}</p>
                      {device.current && (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">Last active: {device.lastActive}</p>
                  </div>
                </div>
                {!device.current && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveDevice(device.id)}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsSection;
