import { useState, useEffect, useCallback } from 'react';
import { User, Phone, Mail, MapPin, Calendar, Camera, Globe, Bell, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import happyChild from '@/assets/child-grass-happy.jpg';

const ProfileSection = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    language: 'english',
    emailNotifications: true,
    smsNotifications: false,
    avatarUrl: '',
  });

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // First, use data from auth (faster, no DB call needed for basic info)
      const fullNameFromAuth = user.user_metadata?.full_name || '';
      const nameParts = fullNameFromAuth.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      // Set initial profile from auth data
      setProfile({
        firstName,
        lastName,
        dateOfBirth: '',
        email: user.email || '',
        phone: '',
        address: '',
        emergencyName: '',
        emergencyPhone: '',
        emergencyRelation: '',
        language: 'english',
        emailNotifications: true,
        smsNotifications: false,
        avatarUrl: '',
      });

      // Then fetch extended profile data from database (for avatar, additional fields, etc.)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        // Update profile with database data (overrides auth data if different)
        const dbNameParts = (data.full_name || '').split(' ');
        const dbFirstName = dbNameParts[0] || firstName;
        const dbLastName = dbNameParts.slice(1).join(' ') || lastName;

        setProfile(prev => ({
          ...prev,
          firstName: dbFirstName,
          lastName: dbLastName,
          dateOfBirth: data.date_of_birth || '',
          email: data.email || prev.email,
          phone: data.phone || '',
          address: data.address || '',
          emergencyName: data.emergency_contact_name || '',
          emergencyPhone: data.emergency_contact_phone || '',
          emergencyRelation: data.emergency_contact_relation || '',
          language: data.preferred_language || 'english',
          emailNotifications: data.email_notifications ?? true,
          smsNotifications: data.sms_notifications ?? false,
          avatarUrl: data.avatar_url || '',
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Don't show error toast - we already have auth data loaded
      // toast.error('Failed to load extended profile');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  const handleSave = async () => {
    if (!user) return;

    try {
      const fullName = `${profile.firstName} ${profile.lastName}`.trim();
      
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          email: profile.email,
          date_of_birth: profile.dateOfBirth || null,
          phone: profile.phone,
          address: profile.address,
          emergency_contact_name: profile.emergencyName,
          emergency_contact_phone: profile.emergencyPhone,
          emergency_contact_relation: profile.emergencyRelation,
          preferred_language: profile.language,
          email_notifications: profile.emailNotifications,
          sms_notifications: profile.smsNotifications,
          avatar_url: profile.avatarUrl,
        })
        .eq('id', user.id);

      if (error) throw error;

    setIsEditing(false);
    toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleNotificationToggle = async (field: 'emailNotifications' | 'smsNotifications', value: boolean) => {
    if (!user) return;

    // Update local state immediately for responsive UI
    setProfile(prev => ({ ...prev, [field]: value }));

    // Save to database
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          [field === 'emailNotifications' ? 'email_notifications' : 'sms_notifications']: value,
        })
        .eq('id', user.id);

      if (error) throw error;
      toast.success('Notification preference updated');
    } catch (error) {
      console.error('Error updating notification preference:', error);
      // Revert local state on error
      setProfile(prev => ({ ...prev, [field]: !value }));
      toast.error('Failed to update notification preference');
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setLoading(true);
    toast.info('Uploading photo...');

    try {
      // Create unique file name (use underscore to separate user ID from timestamp)
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL (RLS will still enforce access control)
      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      // Update profile with avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Update local state
      setProfile(prev => ({ ...prev, avatarUrl: publicUrl }));
      toast.success('Profile photo updated successfully');
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload photo');
    } finally {
      setLoading(false);
    }
  };

  // Get initials for avatar fallback
  const getInitials = () => {
    const first = profile.firstName.charAt(0).toUpperCase();
    const last = profile.lastName.charAt(0).toUpperCase();
    return first + last || 'U';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-patient-teal" />
      </div>
    );
  }

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
                <AvatarImage src={profile.avatarUrl || happyChild} alt="Profile" />
                <AvatarFallback className="bg-patient-teal text-white text-2xl">{getInitials()}</AvatarFallback>
              </Avatar>
              <div className="relative">
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  ) : (
                  <Camera className="h-3 w-3 mr-1" />
                  )}
                  Change Photo
                </Button>
              </div>
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
                  <p className="mt-1 text-muted-foreground">{profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'Not set'}</p>
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
              onCheckedChange={(checked) => handleNotificationToggle('emailNotifications', checked)}
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
              onCheckedChange={(checked) => handleNotificationToggle('smsNotifications', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSection;
