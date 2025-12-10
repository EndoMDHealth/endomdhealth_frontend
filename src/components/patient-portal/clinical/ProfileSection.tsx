import { useState } from 'react';
import { User, Phone, Mail, MapPin, Calendar, Camera, Globe, Bell, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import happyChild from '@/assets/child-grass-happy.jpg';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    dateOfBirth: '2015-03-15',
    email: 'parent@email.com',
    phone: '(703) 555-1234',
    address: '123 Oak Street, Springfield, VA 22150',
    emergencyName: 'Michael Johnson',
    emergencyPhone: '(703) 555-5678',
    emergencyRelation: 'Father',
    language: 'english',
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
              <User className="h-5 w-5 text-patient-gold" />
              Personal Information
            </CardTitle>
            <Button
              variant={isEditing ? 'outline' : 'default'}
              size="sm"
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={isEditing ? '' : 'bg-patient-teal hover:bg-patient-teal/90'}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24 border-4 border-patient-teal/20">
                <AvatarImage src={happyChild} alt="Profile" />
                <AvatarFallback className="bg-patient-teal text-white text-2xl">SJ</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button size="sm" variant="outline" className="text-xs">
                  <Camera className="h-3 w-3 mr-1" />
                  Change Photo
                </Button>
              )}
            </div>

            {/* Profile Fields */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-patient-navy text-sm font-medium">First Name</Label>
                {isEditing ? (
                  <Input
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-muted-foreground">{profile.firstName}</p>
                )}
              </div>
              <div>
                <Label className="text-patient-navy text-sm font-medium">Last Name</Label>
                {isEditing ? (
                  <Input
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-muted-foreground">{profile.lastName}</p>
                )}
              </div>
              <div>
                <Label className="text-patient-navy text-sm font-medium flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-patient-gold" />
                  Date of Birth
                </Label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-muted-foreground">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                )}
              </div>
              <div>
                <Label className="text-patient-navy text-sm font-medium flex items-center gap-1">
                  <Mail className="h-3 w-3 text-patient-gold" />
                  Email Address
                </Label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-muted-foreground">{profile.email}</p>
                )}
              </div>
              <div>
                <Label className="text-patient-navy text-sm font-medium flex items-center gap-1">
                  <Phone className="h-3 w-3 text-patient-gold" />
                  Phone Number
                </Label>
                {isEditing ? (
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-muted-foreground">{profile.phone}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <Label className="text-patient-navy text-sm font-medium flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-patient-gold" />
                  Address
                </Label>
                {isEditing ? (
                  <Input
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-muted-foreground">{profile.address}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact Card */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-patient-gold" />
            Emergency Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-patient-navy text-sm font-medium">Contact Name</Label>
              {isEditing ? (
                <Input
                  value={profile.emergencyName}
                  onChange={(e) => setProfile({ ...profile, emergencyName: e.target.value })}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-muted-foreground">{profile.emergencyName}</p>
              )}
            </div>
            <div>
              <Label className="text-patient-navy text-sm font-medium">Phone Number</Label>
              {isEditing ? (
                <Input
                  value={profile.emergencyPhone}
                  onChange={(e) => setProfile({ ...profile, emergencyPhone: e.target.value })}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-muted-foreground">{profile.emergencyPhone}</p>
              )}
            </div>
            <div>
              <Label className="text-patient-navy text-sm font-medium">Relationship</Label>
              {isEditing ? (
                <Select value={profile.emergencyRelation} onValueChange={(value) => setProfile({ ...profile, emergencyRelation: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Guardian">Guardian</SelectItem>
                    <SelectItem value="Grandparent">Grandparent</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="mt-1 text-muted-foreground">{profile.emergencyRelation}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences Card */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
            <Globe className="h-5 w-5 text-patient-gold" />
            Language & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-patient-navy text-sm font-medium">Preferred Language</Label>
            <Select value={profile.language} onValueChange={(value) => setProfile({ ...profile, language: value })}>
              <SelectTrigger className="mt-1 w-full md:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Español</SelectItem>
                <SelectItem value="french">Français</SelectItem>
                <SelectItem value="arabic">العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between p-4 bg-patient-bg rounded-xl">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-patient-gold" />
              <div>
                <p className="font-medium text-patient-navy">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive appointment reminders via email</p>
              </div>
            </div>
            <Switch
              checked={profile.emailNotifications}
              onCheckedChange={(checked) => setProfile({ ...profile, emailNotifications: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-patient-bg rounded-xl">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-patient-gold" />
              <div>
                <p className="font-medium text-patient-navy">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Receive text message reminders</p>
              </div>
            </div>
            <Switch
              checked={profile.smsNotifications}
              onCheckedChange={(checked) => setProfile({ ...profile, smsNotifications: checked })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSection;
