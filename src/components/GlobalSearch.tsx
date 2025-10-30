import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Search, MapPin, Flower2, Users, X } from 'lucide-react';
import { Button } from './ui/button';

interface SearchResult {
  id: string;
  type: 'plant' | 'area' | 'community';
  title: string;
  subtitle: string;
  badge?: string;
}

const searchData: SearchResult[] = [
  // Plants
  { id: 'p1', type: 'plant', title: 'Tulsi (Holy Basil)', subtitle: 'Ocimum tenuiflorum', badge: '🌿' },
  { id: 'p2', type: 'plant', title: 'Surajmukhi (Sunflower)', subtitle: 'Helianthus annuus', badge: '🌻' },
  { id: 'p3', type: 'plant', title: 'Marigold (Genda)', subtitle: 'Tagetes erecta', badge: '🌼' },
  { id: 'p4', type: 'plant', title: 'Mogra (Jasmine)', subtitle: 'Jasminum sambac', badge: '🌸' },
  { id: 'p5', type: 'plant', title: 'Gulab (Rose)', subtitle: 'Rosa indica', badge: '🌹' },
  { id: 'p6', type: 'plant', title: 'Neem', subtitle: 'Azadirachta indica', badge: '🌳' },
  { id: 'p7', type: 'plant', title: 'Champa (Frangipani)', subtitle: 'Plumeria rubra', badge: '🏵️' },
  { id: 'p8', type: 'plant', title: 'Harsingar', subtitle: 'Nyctanthes arbor-tristis', badge: '🌺' },
  
  // Areas
  { id: 'a1', type: 'area', title: 'Madhu Kendra A3', subtitle: 'Dharampur Gaon', badge: '🏛️' },
  { id: 'a2', type: 'area', title: 'Mukhya Madhu Kosh', subtitle: 'Dharampur Gaon', badge: '🏺' },
  { id: 'a3', type: 'area', title: 'Madhu Kendra B1', subtitle: 'Haripur Village', badge: '🏛️' },
  { id: 'a4', type: 'area', title: 'Purva Madhu Kosh', subtitle: 'Haripur Village', badge: '🏺' },
  { id: 'a5', type: 'area', title: 'Dakshin Madhu Kosh', subtitle: 'Nandgaon', badge: '🏺' },
  
  // Communities
  { id: 'c1', type: 'community', title: 'Dharampur Gaon', subtitle: '2847 points • Rank #1', badge: '🥇' },
  { id: 'c2', type: 'community', title: 'Haripur Village', subtitle: '2654 points • Rank #2', badge: '🥈' },
  { id: 'c3', type: 'community', title: 'Nandgaon', subtitle: '2401 points • Rank #3', badge: '🥉' },
  { id: 'c4', type: 'community', title: 'Phoolbagan', subtitle: '2198 points • Rank #4', badge: '🌺' },
  { id: 'c5', type: 'community', title: 'Madhubani', subtitle: '2067 points • Rank #5', badge: '🍯' },
];

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const [query, setQuery] = useState('');

  const filteredResults = query.trim()
    ? searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'plant':
        return <Flower2 className="w-4 h-4" />;
      case 'area':
        return <MapPin className="w-4 h-4" />;
      case 'community':
        return <Users className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'plant':
        return 'bg-green-100 text-green-700';
      case 'area':
        return 'bg-blue-100 text-blue-700';
      case 'community':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-stone-100 text-stone-700';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top" className="h-[90vh] rounded-b-3xl p-6">
        <SheetHeader className="mb-4">
          <SheetTitle>Universal Search</SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <Input
              type="text"
              placeholder="Search plants, areas, or communities..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 rounded-2xl border-stone-300"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setQuery('')}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Search Results */}
          <div className="space-y-2 overflow-auto max-h-[calc(90vh-180px)]">
            {query.trim() === '' && (
              <Card className="p-8 rounded-2xl bg-amber-50 border-amber-200 text-center">
                <Search className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <p className="text-stone-600">
                  Start typing to search for plants, areas, or communities
                </p>
              </Card>
            )}

            {query.trim() !== '' && filteredResults.length === 0 && (
              <Card className="p-8 rounded-2xl bg-stone-50 border-stone-200 text-center">
                <p className="text-stone-600">No results found for "{query}"</p>
              </Card>
            )}

            {filteredResults.map((result) => (
              <Card
                key={result.id}
                className="p-4 rounded-2xl bg-white border-stone-200 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {result.badge && (
                    <div className="text-2xl flex-shrink-0">{result.badge}</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-stone-800 truncate">{result.title}</h3>
                    <p className="text-sm text-stone-500 truncate">
                      {result.subtitle}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${getTypeColor(result.type)} rounded-full capitalize`}
                  >
                    <span className="mr-1">{getTypeIcon(result.type)}</span>
                    {result.type}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Filters */}
          {query.trim() === '' && (
            <div>
              <p className="text-sm text-stone-600 mb-2">Quick Filters</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setQuery('madhu kendra')}
                >
                  🏛️ Madhu Kendra
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setQuery('tulsi')}
                >
                  🌿 Tulsi
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setQuery('dharampur')}
                >
                  🥇 Top Villages
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setQuery('madhu kosh')}
                >
                  🏺 Madhu Kosh
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
