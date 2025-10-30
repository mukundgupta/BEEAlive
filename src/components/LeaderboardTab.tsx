import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, TrendingUp } from 'lucide-react';
import { CommunityDetailView } from './CommunityDetailView';

const leaderboardData = [
  { rank: 1, community: 'Dharampur Gaon', score: 2847, change: '+125', trend: 'up', badge: '🥇' },
  { rank: 2, community: 'Haripur Village', score: 2654, change: '+89', trend: 'up', badge: '🥈' },
  { rank: 3, community: 'Nandgaon', score: 2401, change: '+76', trend: 'up', badge: '🥉' },
  { rank: 4, community: 'Phoolbagan', score: 2198, change: '+112', trend: 'up', badge: '' },
  { rank: 5, community: 'Madhubani', score: 2067, change: '+45', trend: 'up', badge: '' },
  { rank: 6, community: 'Shantivan', score: 1923, change: '+34', trend: 'up', badge: '' },
  { rank: 7, community: 'Devgarh', score: 1801, change: '+28', trend: 'up', badge: '' },
  { rank: 8, community: 'Puspanjali Gram', score: 1689, change: '+67', trend: 'up', badge: '' },
];

export function LeaderboardTab() {
  const [selectedCommunity, setSelectedCommunity] = useState<typeof leaderboardData[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleCommunityClick = (community: typeof leaderboardData[0]) => {
    setSelectedCommunity(community);
    setDetailsOpen(true);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header Card */}
      <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 rounded-3xl border-none shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-amber-100 text-sm">Monthly Rankings</p>
            <h2 className="mt-1">October 2025</h2>
          </div>
          <Trophy className="w-12 h-12 text-amber-200" />
        </div>
        <p className="mt-3 text-amber-50 text-sm">
          Celebrating the most active and sustainable communities
        </p>
      </Card>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {leaderboardData.map((item) => (
          <Card
            key={item.rank}
            onClick={() => handleCommunityClick(item)}
            className={`p-4 rounded-2xl transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer ${
              item.rank <= 3
                ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'
                : 'bg-white border-stone-200'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                {item.badge ? (
                  <span className="text-2xl">{item.badge}</span>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
                    {item.rank}
                  </div>
                )}
              </div>

              {/* Community Info */}
              <div className="flex-1 min-w-0">
                <h3 className="truncate text-stone-800">{item.community}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 rounded-full">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {item.change}
                  </Badge>
                </div>
              </div>

              {/* Score */}
              <div className="text-right">
                <div className="text-amber-600">{item.score.toLocaleString()}</div>
                <div className="text-xs text-stone-500">points</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="p-4 rounded-2xl bg-green-50 border-green-200">
        <h3 className="text-green-900">How Points Work</h3>
        <ul className="mt-2 space-y-1 text-sm text-green-800">
          <li>• Maintaining bee towers (verified photos)</li>
          <li>• Number of flowering plants added</li>
          <li>• Bee activity sightings</li>
          <li>• Honey harvest data from registered hives</li>
        </ul>
      </Card>

      {/* Community Detail View */}
      <CommunityDetailView
        community={selectedCommunity}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}
