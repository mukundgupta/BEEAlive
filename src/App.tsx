import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Trophy, Map, BookOpen, MessageSquare, Search, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Sheet, SheetContent } from './components/ui/sheet';
import { LeaderboardTab } from './components/LeaderboardTab';
import { MapTab } from './components/MapTab';
import { DirectoryTab } from './components/DirectoryTab';
import { FeedbackTab } from './components/FeedbackTab';
import { ProfileTab } from './components/ProfileTab';
import { GlobalSearch } from './components/GlobalSearch';
import { NotificationsDrawer } from './components/NotificationsDrawer';

export default function App() {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [userName, setUserName] = useState('Priya Sharma');
  const [userVillage, setUserVillage] = useState('Dharampur Gaon');
  
  // Beekeeper state
  const [isBeekeeper, setIsBeekeeper] = useState(false);
  const [beekeeperData, setBeekeeperData] = useState<{
    apiaryId: string;
    apiaryName: string;
    phone: string;
    email: string;
    experience: string;
  } | undefined>();
  const [beekeepers, setBeekeepers] = useState<{ [apiaryId: string]: {
    name: string;
    phone: string;
    email: string;
    experience: string;
    village: string;
  } }>({});

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleBecomeBeekeeper = (data: {
    apiaryId: string;
    apiaryName: string;
    phone: string;
    email: string;
    experience: string;
  }) => {
    setIsBeekeeper(true);
    setBeekeeperData(data);
    setBeekeepers(prev => ({
      ...prev,
      [data.apiaryId]: {
        name: userName,
        phone: data.phone,
        email: data.email,
        experience: data.experience,
        village: userVillage,
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-md mx-auto h-screen flex flex-col">
        {/* Fixed Header */}
        <div className="bg-white border-b border-amber-100 shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Profile Avatar - Left */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full p-0 h-10 w-10"
              onClick={() => setProfileOpen(true)}
            >
              <Avatar className="h-10 w-10 border-2 border-amber-300">
                <AvatarImage src="" />
                <AvatarFallback className="bg-amber-100 text-amber-900">{getInitials(userName)}</AvatarFallback>
              </Avatar>
            </Button>

            {/* App Name - Center */}
            <div className="text-center flex-1 mx-3">
              <h1 className="text-amber-900">#BEEAlive</h1>
              <p className="text-xs text-amber-700">Conservation Network</p>
            </div>

            {/* Search & Notifications - Right */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative text-amber-900 hover:bg-amber-100"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative text-amber-900 hover:bg-amber-100"
                onClick={() => setNotificationsOpen(true)}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 hover:bg-red-500 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Profile Drawer */}
        <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
          <SheetContent side="left" className="w-full sm:max-w-md p-0">
            <ProfileTab 
              userName={userName}
              userVillage={userVillage}
              onUpdateProfile={(name: string, village: string) => {
                setUserName(name);
                setUserVillage(village);
              }}
              isBeekeeper={isBeekeeper}
              beekeeperData={beekeeperData}
              onBecomeBeekeeper={handleBecomeBeekeeper}
            />
          </SheetContent>
        </Sheet>

        {/* Global Search Sheet */}
        <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />

        {/* Notifications Drawer */}
        <NotificationsDrawer 
          open={notificationsOpen} 
          onOpenChange={setNotificationsOpen}
          unreadCount={unreadCount}
          onUnreadCountChange={setUnreadCount}
        />

        {/* Content Area */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-auto pb-20">
            <TabsContent value="leaderboard" className="m-0 h-full">
              <LeaderboardTab />
            </TabsContent>
            <TabsContent value="map" className="m-0 h-full">
              <MapTab beekeepers={beekeepers} />
            </TabsContent>
            <TabsContent value="directory" className="m-0 h-full">
              <DirectoryTab />
            </TabsContent>
            <TabsContent value="feedback" className="m-0 h-full">
              <FeedbackTab />
            </TabsContent>
          </div>

          {/* Fixed Bottom Tab Navigation */}
          <TabsList className="fixed bottom-0 left-0 right-0 max-w-md mx-auto w-full h-auto p-0 bg-white border-t border-amber-200 rounded-none grid grid-cols-4 z-40">
            <TabsTrigger
              value="leaderboard"
              className="flex-col gap-1 py-3 px-2 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 rounded-none"
            >
              <Trophy className="w-5 h-5" />
              <span className="text-xs">Leaderboard</span>
            </TabsTrigger>
            <TabsTrigger
              value="map"
              className="flex-col gap-1 py-3 px-2 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 rounded-none"
            >
              <Map className="w-5 h-5" />
              <span className="text-xs">Map</span>
            </TabsTrigger>
            <TabsTrigger
              value="directory"
              className="flex-col gap-1 py-3 px-2 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 rounded-none"
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">Directory</span>
            </TabsTrigger>
            <TabsTrigger
              value="feedback"
              className="flex-col gap-1 py-3 px-2 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 rounded-none"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs">Feedback</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
