import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Bell, CheckCircle2, X } from 'lucide-react';
import { Button } from './ui/button';

interface Notification {
  id: string;
  type: 'achievement' | 'update' | 'community' | 'activity';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'achievement',
    title: 'New Achievement Unlocked!',
    message: 'You earned the "Plant Expert" badge for adding 25+ plants',
    time: '5 min ago',
    read: false,
    icon: '🌻',
  },
  {
    id: '2',
    type: 'community',
    title: 'Dharampur Village Ranked #1',
    message: 'Your community just reached the top of the leaderboard!',
    time: '2 hours ago',
    read: false,
    icon: '🥇',
  },
  {
    id: '3',
    type: 'activity',
    title: 'New Bee Sighting Nearby',
    message: '3 new bee sightings reported at Madhu Kendra A3',
    time: '5 hours ago',
    read: true,
    icon: '🐝',
  },
  {
    id: '4',
    type: 'update',
    title: 'Tower Maintenance Verified',
    message: 'Your Madhu Kendra B1 maintenance photo has been verified',
    time: '1 day ago',
    read: true,
    icon: '🏛️',
  },
  {
    id: '5',
    type: 'community',
    title: 'Community Event Tomorrow',
    message: 'Honey harvest event at Community Garden, 10 AM',
    time: '1 day ago',
    read: true,
    icon: '🍯',
  },
];

interface NotificationsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unreadCount: number;
  onUnreadCountChange: (count: number) => void;
}

export function NotificationsDrawer({ open, onOpenChange, unreadCount, onUnreadCountChange }: NotificationsDrawerProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const updateUnreadCount = (notifs: Notification[]) => {
    const count = notifs.filter((n) => !n.read).length;
    onUnreadCountChange(count);
  };

  const handleMarkAsRead = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    updateUnreadCount(updated);
  };

  const handleMarkAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    updateUnreadCount(updated);
  };

  const handleDelete = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    updateUnreadCount(updated);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'bg-amber-50 border-amber-200';
      case 'community':
        return 'bg-green-50 border-green-200';
      case 'activity':
        return 'bg-blue-50 border-blue-200';
      case 'update':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-stone-50 border-stone-200';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-6">
        <SheetHeader className="mb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-600" />
              Notifications
            </SheetTitle>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 hover:bg-red-500 rounded-full">
                {unreadCount} new
              </Badge>
            )}
          </div>
        </SheetHeader>

        <div className="space-y-3 overflow-auto max-h-[calc(100vh-180px)]">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 rounded-2xl transition-all ${
                notification.read ? 'bg-white border-stone-200' : getTypeColor(notification.type)
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">{notification.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-stone-800 flex-1">{notification.title}</h3>
                    <div className="flex items-center gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full hover:bg-green-100"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-red-100"
                        onClick={() => handleDelete(notification.id)}
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-stone-600 mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-stone-500">{notification.time}</p>
                </div>
              </div>
            </Card>
          ))}

          {notifications.length === 0 && (
            <Card className="p-8 rounded-2xl bg-stone-50 border-stone-200 text-center">
              <CheckCircle2 className="w-12 h-12 text-stone-400 mx-auto mb-3" />
              <p className="text-stone-600">You're all caught up!</p>
              <p className="text-sm text-stone-500 mt-1">
                No new notifications at the moment
              </p>
            </Card>
          )}
        </div>

        {unreadCount > 0 && (
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full rounded-2xl"
              onClick={handleMarkAllAsRead}
            >
              Mark All as Read
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
