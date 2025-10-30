import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Award, TrendingUp, Camera, Edit, Share2, Flower2, Hexagon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

const achievements = [
  { id: 1, title: 'First Sighting', icon: '🐝', earned: true },
  { id: 2, title: 'Plant Expert', icon: '🌻', earned: true },
  { id: 3, title: 'Kendra Guardian', icon: '🏛️', earned: true },
  { id: 4, title: 'Community Leader', icon: '👑', earned: false },
  { id: 5, title: 'Honey Harvester', icon: '🍯', earned: true },
  { id: 6, title: 'Photo Pro', icon: '📸', earned: false },
];

const activityLog = [
  { id: 1, action: 'Submitted bee sighting', location: 'Madhu Kendra A3', time: '2 hours ago', icon: '🐝' },
  { id: 2, action: 'Added 5 new Tulsi plants', location: 'Community Garden', time: '1 day ago', icon: '🌺' },
  { id: 3, action: 'Verified kendra maintenance', location: 'Madhu Kendra B1', time: '3 days ago', icon: '🏛️' },
  { id: 4, action: 'Uploaded harvest data', location: 'Madhu Kosh 7', time: '1 week ago', icon: '🍯' },
];

interface ProfileTabProps {
  userName: string;
  userVillage: string;
  onUpdateProfile: (name: string, village: string) => void;
  isBeekeeper?: boolean;
  beekeeperData?: {
    apiaryId: string;
    apiaryName: string;
    phone: string;
    email: string;
    experience: string;
  };
  onBecomeBeekeeper?: (data: {
    apiaryId: string;
    apiaryName: string;
    phone: string;
    email: string;
    experience: string;
  }) => void;
}

export function ProfileTab({ userName, userVillage, onUpdateProfile, isBeekeeper, beekeeperData, onBecomeBeekeeper }: ProfileTabProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [beekeeperFormOpen, setBeekeeperFormOpen] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [tempVillage, setTempVillage] = useState(userVillage);
  
  // Beekeeper form state
  const [selectedApiary, setSelectedApiary] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');

  const apiaries = [
    { id: 'n1-apiary', name: 'Mukhya Madhu Kosh', village: 'Dharampur Gaon' },
    { id: 'n2-apiary', name: 'Purva Madhu Kosh', village: 'Haripur Village' },
    { id: 'n3-apiary', name: 'Dakshin Madhu Kosh', village: 'Nandgaon' },
  ];

  const handleUploadPhoto = () => {
    toast.success('Photo upload feature opening...');
  };

  const handleShare = () => {
    setShareOpen(true);
  };

  const handleCopyLink = () => {
    toast.success('Profile link copied to clipboard!');
    setShareOpen(false);
  };

  const handleOpenEdit = () => {
    setTempName(userName);
    setTempVillage(userVillage);
    setSettingsOpen(true);
  };

  const handleSaveChanges = () => {
    onUpdateProfile(tempName, tempVillage);
    toast.success('Profile updated successfully!');
    setSettingsOpen(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleBeekeeperRegistration = () => {
    if (!selectedApiary || !phone || !email || !experience) {
      toast.error('Please fill all fields');
      return;
    }

    const apiary = apiaries.find(a => a.id === selectedApiary);
    if (!apiary) return;

    if (onBecomeBeekeeper) {
      onBecomeBeekeeper({
        apiaryId: selectedApiary,
        apiaryName: apiary.name,
        phone,
        email,
        experience,
      });
    }

    toast.success('Successfully registered as beekeeper!');
    setBeekeeperFormOpen(false);
    setSelectedApiary('');
    setPhone('');
    setEmail('');
    setExperience('');
  };

  return (
    <div className="p-6 space-y-4 overflow-auto h-full pb-6">
      {/* Profile Header */}
      <Card className="p-6 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 text-white border-none">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-4 border-white/30">
              <AvatarImage src="" />
              <AvatarFallback className="bg-amber-300 text-amber-900">{getInitials(userName)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="mb-1">{userName}</h2>
              <p className="text-amber-100 text-sm">{userVillage}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 rounded-full"
            onClick={handleOpenEdit}
          >
            <Edit className="w-5 h-5" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl">847</div>
            <div className="text-xs text-amber-100 mt-1">Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl">23</div>
            <div className="text-xs text-amber-100 mt-1">Contributions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl">12</div>
            <div className="text-xs text-amber-100 mt-1">Verified</div>
          </div>
        </div>
      </Card>

      {/* Level Progress */}
      <Card className="p-4 rounded-2xl bg-white border-stone-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <span className="text-stone-800">Level 7 - Guardian</span>
          </div>
          <span className="text-sm text-stone-500">847 / 1000</span>
        </div>
        <Progress value={84.7} className="h-2" />
        <p className="text-xs text-stone-500 mt-2">
          153 points until Level 8 - Master Guardian
        </p>
      </Card>

      {/* Beekeeper Status */}
      {isBeekeeper && beekeeperData && (
        <Card className="p-4 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 border-green-300">
          <div className="flex items-center gap-3 mb-2">
            <Hexagon className="w-5 h-5 text-green-700" />
            <h3 className="text-green-900">Beekeeper Status</h3>
            <Badge className="ml-auto bg-green-600 hover:bg-green-600">Active</Badge>
          </div>
          <div className="space-y-1 text-sm text-green-800">
            <p>📍 {beekeeperData.apiaryName}</p>
            <p>📞 {beekeeperData.phone}</p>
            <p>✉️ {beekeeperData.email}</p>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-20 rounded-2xl border-2 flex flex-col gap-2 hover:bg-green-50 hover:border-green-300"
          onClick={handleUploadPhoto}
        >
          <Camera className="w-6 h-6 text-green-600" />
          <span className="text-sm">Upload Photo</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 rounded-2xl border-2 flex flex-col gap-2 hover:bg-amber-50 hover:border-amber-300"
          onClick={handleShare}
        >
          <Share2 className="w-6 h-6 text-amber-600" />
          <span className="text-sm">Share Profile</span>
        </Button>
      </div>

      {/* Become a Beekeeper */}
      {!isBeekeeper && (
        <Card className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center gap-3 mb-3">
            <Hexagon className="w-6 h-6 text-amber-600" />
            <div className="flex-1">
              <h3 className="text-amber-900">Become a Beekeeper</h3>
              <p className="text-xs text-amber-700 mt-1">
                Take charge of a Madhu Kosh in your village
              </p>
            </div>
          </div>
          <Button
            className="w-full rounded-2xl bg-amber-600 hover:bg-amber-700"
            onClick={() => setBeekeeperFormOpen(true)}
          >
            Register as Beekeeper
          </Button>
        </Card>
      )}

      {/* Achievements */}
      <Card className="p-4 rounded-2xl bg-white border-stone-200">
        <h3 className="text-stone-800 mb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-600" />
          Achievements
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-xl text-center transition-all ${
                achievement.earned
                  ? 'bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300'
                  : 'bg-stone-100 border-2 border-stone-200 opacity-40'
              }`}
            >
              <div className="text-2xl mb-1">{achievement.icon}</div>
              <div className="text-xs text-stone-700">{achievement.title}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-4 rounded-2xl bg-white border-stone-200">
        <h3 className="text-stone-800 mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {activityLog.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-3 border-b border-stone-100 last:border-0 last:pb-0"
            >
              <div className="text-2xl">{activity.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-stone-800">{activity.action}</p>
                <p className="text-xs text-stone-500 mt-1">
                  {activity.location} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Impact Stats */}
      <Card className="p-4 rounded-2xl bg-green-50 border-green-200">
        <h3 className="text-green-900 mb-3">Your Impact This Month</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-800 flex items-center gap-2">
              <Flower2 className="w-4 h-4" />
              Plants Added
            </span>
            <span className="text-green-900">28 plants</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-800">🐝 Bee Sightings</span>
            <span className="text-green-900">15 sightings</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-800">📸 Photos Verified</span>
            <span className="text-green-900">12 photos</span>
          </div>
        </div>
      </Card>

      {/* Edit Profile Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your profile information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={tempName} 
                onChange={(e) => setTempName(e.target.value)}
                className="mt-2 rounded-xl" 
              />
            </div>
            <div>
              <Label htmlFor="village">Village</Label>
              <Input 
                id="village" 
                value={tempVillage}
                onChange={(e) => setTempVillage(e.target.value)}
                className="mt-2 rounded-xl" 
              />
            </div>
            <Button 
              className="w-full rounded-2xl bg-amber-600 hover:bg-amber-700"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle>Share Profile</DialogTitle>
            <DialogDescription>Share your conservation achievements</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-stone-100 rounded-xl">
              <p className="text-sm text-stone-600 mb-2">Profile Link:</p>
              <p className="text-sm text-stone-800 break-all">
                https://beealive.org/profile/{userName.toLowerCase().replace(/\s+/g, '-')}
              </p>
            </div>
            <Button 
              className="w-full rounded-2xl bg-amber-600 hover:bg-amber-700"
              onClick={handleCopyLink}
            >
              Copy Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Beekeeper Registration Dialog */}
      <Dialog open={beekeeperFormOpen} onOpenChange={setBeekeeperFormOpen}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Hexagon className="w-5 h-5 text-amber-600" />
              Become a Beekeeper
            </DialogTitle>
            <DialogDescription>
              Register to manage a Madhu Kosh in your village
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="apiary">Select Madhu Kosh</Label>
              <Select value={selectedApiary} onValueChange={setSelectedApiary}>
                <SelectTrigger className="mt-2 rounded-xl">
                  <SelectValue placeholder="Choose a Madhu Kosh" />
                </SelectTrigger>
                <SelectContent>
                  {apiaries.map((apiary) => (
                    <SelectItem key={apiary.id} value={apiary.id}>
                      {apiary.name} - {apiary.village}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="phone">Contact Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="experience">Experience & Skills</Label>
              <Textarea
                id="experience"
                placeholder="Describe your beekeeping experience, certifications, years of practice, etc."
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="mt-2 rounded-xl min-h-[100px]"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-2xl"
                onClick={() => setBeekeeperFormOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 rounded-2xl bg-amber-600 hover:bg-amber-700"
                onClick={handleBeekeeperRegistration}
              >
                Register
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
