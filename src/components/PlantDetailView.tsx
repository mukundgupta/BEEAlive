import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Droplets, Sun, Calendar, TrendingUp, Users, MapPin, Award } from 'lucide-react';
import { Progress } from './ui/progress';

interface Plant {
  id: string;
  name: string;
  scientificName: string;
  season: string;
  water: 'low' | 'medium' | 'high';
  sunlight: 'full' | 'partial' | 'shade';
  attractsBees: boolean;
  image: string;
}

interface PlantDetailViewProps {
  plant: Plant | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const communityData = [
  { name: 'Dharampur Gaon', count: 156, successRate: 94 },
  { name: 'Haripur Village', count: 142, successRate: 91 },
  { name: 'Nandgaon', count: 128, successRate: 89 },
  { name: 'Phoolbagan', count: 98, successRate: 87 },
  { name: 'Madhubani', count: 76, successRate: 92 },
];

export function PlantDetailView({ plant, open, onOpenChange }: PlantDetailViewProps) {
  if (!plant) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-6 overflow-auto">
        <SheetHeader className="mb-4">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{plant.image}</div>
            <div className="flex-1">
              <SheetTitle className="text-2xl">{plant.name}</SheetTitle>
              <p className="text-sm text-stone-500 italic mt-1">{plant.scientificName}</p>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 rounded-xl bg-blue-50 border-blue-200 text-center">
              <Droplets className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-blue-900 capitalize">{plant.water}</p>
              <p className="text-xs text-blue-700">Water</p>
            </Card>
            <Card className="p-3 rounded-xl bg-amber-50 border-amber-200 text-center">
              <Sun className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <p className="text-xs text-amber-900 capitalize">{plant.sunlight}</p>
              <p className="text-xs text-amber-700">Sunlight</p>
            </Card>
            <Card className="p-3 rounded-xl bg-green-50 border-green-200 text-center">
              <Calendar className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-xs text-green-900">{plant.season}</p>
              <p className="text-xs text-green-700">Season</p>
            </Card>
          </div>

          {/* Overall Success Rate */}
          <Card className="p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-green-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Overall Success Rate
              </h3>
              <span className="text-2xl text-green-700">91%</span>
            </div>
            <Progress value={91} className="h-2 bg-green-200" />
            <p className="text-sm text-green-800 mt-2">
              Excellent performance across all communities
            </p>
          </Card>

          {/* Total Communities Using */}
          <Card className="p-4 rounded-2xl bg-amber-50 border-amber-200">
            <div className="flex items-center justify-between">
              <h3 className="text-amber-900 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Communities Using
              </h3>
              <Badge className="bg-amber-600 hover:bg-amber-600 rounded-full">
                {communityData.length} active
              </Badge>
            </div>
          </Card>

          {/* Community Breakdown */}
          <div>
            <h3 className="text-stone-800 mb-3">Community Performance</h3>
            <div className="space-y-3">
              {communityData.map((community, index) => (
                <Card key={index} className="p-4 rounded-2xl bg-white border-stone-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-stone-500" />
                        <h4 className="text-stone-800">{community.name}</h4>
                      </div>
                      <p className="text-sm text-stone-600">
                        {community.count} plants grown
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-green-700">{community.successRate}%</div>
                      <p className="text-xs text-stone-500">success</p>
                    </div>
                  </div>
                  <Progress value={community.successRate} className="h-1.5" />
                </Card>
              ))}
            </div>
          </div>

          {/* Care Tips */}
          <Card className="p-4 rounded-2xl bg-green-50 border-green-200">
            <h3 className="text-green-900 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Growing Tips
            </h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Best planted in early {plant.season.toLowerCase()}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Requires {plant.water} watering frequency</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Thrives in {plant.sunlight} sun exposure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Highly attractive to bees and pollinators</span>
              </li>
            </ul>
          </Card>

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
