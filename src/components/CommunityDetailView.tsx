import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Trophy, TrendingUp, Users, MapPin, Award, Calendar } from 'lucide-react';
import { Progress } from './ui/progress';

interface Community {
  rank: number;
  community: string;
  score: number;
  change: string;
  trend: string;
  badge?: string;
}

interface CommunityDetailViewProps {
  community: Community | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const activities = [
  { type: 'Madhu Kendra Maintenance', count: 15, points: 450, icon: '🏛️', color: 'amber' },
  { type: 'New Plants Added', count: 127, points: 1270, icon: '🌺', color: 'green' },
  { type: 'Bee Sightings', count: 43, points: 645, icon: '🐝', color: 'blue' },
  { type: 'Honey Harvest', count: 8, points: 480, icon: '🍯', color: 'orange' },
];

const recentPosts = [
  {
    id: 1,
    user: 'Priya S.',
    time: '2 hours ago',
    content: 'Just verified 12 new Tulsi plants in Zone A! The bees are loving them 🐝🌿',
    likes: 24,
    image: '🌿',
  },
  {
    id: 2,
    user: 'Rajesh K.',
    time: '1 day ago',
    content: 'Madhu Kendra maintenance complete! All 5 centers are in excellent condition. Great teamwork everyone!',
    likes: 31,
    image: '🏛️',
  },
  {
    id: 3,
    user: 'Anjali M.',
    time: '3 days ago',
    content: 'Honey harvest success! 45kg collected this week. Best yield yet! 🍯✨',
    likes: 52,
    image: '🍯',
  },
];

const topContributors = [
  { name: 'Priya S.', points: 342, avatar: 'PS' },
  { name: 'Rajesh K.', points: 298, avatar: 'RK' },
  { name: 'Anjali M.', points: 276, avatar: 'AM' },
  { name: 'Vijay D.', points: 251, avatar: 'VD' },
];

export function CommunityDetailView({ community, open, onOpenChange }: CommunityDetailViewProps) {
  if (!community) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-6 overflow-auto">
        <SheetHeader className="mb-4">
          <div className="flex items-center gap-3">
            {community.badge && <div className="text-4xl">{community.badge}</div>}
            <div className="flex-1">
              <SheetTitle className="text-2xl">{community.community}</SheetTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                  Rank #{community.rank}
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {community.change}
                </Badge>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-4">
          {/* Total Points */}
          <Card className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white border-none">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm">Total Points</p>
                <div className="text-4xl mt-1">{community.score.toLocaleString()}</div>
              </div>
              <Trophy className="w-16 h-16 text-amber-200 opacity-50" />
            </div>
            <div className="mt-3">
              <Progress value={85} className="h-2 bg-amber-400" />
              <p className="text-sm text-amber-100 mt-1">
                253 points until Rank #{community.rank > 1 ? community.rank - 1 : 1}
              </p>
            </div>
          </Card>

          {/* Activity Breakdown */}
          <div>
            <h3 className="text-stone-800 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Activity Breakdown
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {activities.map((activity, index) => (
                <Card
                  key={index}
                  className="p-3 rounded-xl bg-stone-50 border-stone-200"
                >
                  <div className="text-2xl mb-1">{activity.icon}</div>
                  <p className="text-xs text-stone-700 mb-1">{activity.type}</p>
                  <p className="text-lg text-stone-900">{activity.count}</p>
                  <p className="text-xs text-stone-600">+{activity.points} pts</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Top Contributors */}
          <Card className="p-4 rounded-2xl bg-white border-stone-200">
            <h3 className="text-stone-800 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Top Contributors
            </h3>
            <div className="space-y-2">
              {topContributors.map((contributor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-xs">
                      {contributor.avatar}
                    </div>
                    <span className="text-sm text-stone-800">{contributor.name}</span>
                  </div>
                  <span className="text-sm text-amber-600">{contributor.points} pts</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Community Posts */}
          <div>
            <h3 className="text-stone-800 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Recent Success Stories
            </h3>
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <Card
                  key={post.id}
                  className="p-4 rounded-2xl bg-white border-stone-200"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="text-2xl">{post.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-stone-900">{post.user}</span>
                        <span className="text-xs text-stone-500">{post.time}</span>
                      </div>
                      <p className="text-sm text-stone-700">{post.content}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-sm text-red-500">❤️</span>
                        <span className="text-xs text-stone-500">{post.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3 rounded-xl bg-green-50 border-green-200 text-center">
              <MapPin className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-2xl text-green-900">5</p>
              <p className="text-xs text-green-700">Active Towers</p>
            </Card>
            <Card className="p-3 rounded-xl bg-blue-50 border-blue-200 text-center">
              <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-2xl text-blue-900">87</p>
              <p className="text-xs text-blue-700">Members</p>
            </Card>
          </div>

          <Button
            className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 h-12"
            onClick={() => onOpenChange(false)}
          >
            Close Details
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
