import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Filter, Droplets, Sun } from 'lucide-react';
import { PlantDetailView } from './PlantDetailView';

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

const plants: Plant[] = [
  {
    id: '1',
    name: 'Tulsi (Holy Basil)',
    scientificName: 'Ocimum tenuiflorum',
    season: 'Monsoon-Winter',
    water: 'medium',
    sunlight: 'full',
    attractsBees: true,
    image: '🌿'
  },
  {
    id: '2',
    name: 'Surajmukhi (Sunflower)',
    scientificName: 'Helianthus annuus',
    season: 'Winter',
    water: 'medium',
    sunlight: 'full',
    attractsBees: true,
    image: '🌻'
  },
  {
    id: '3',
    name: 'Marigold (Genda)',
    scientificName: 'Tagetes erecta',
    season: 'Year-round',
    water: 'medium',
    sunlight: 'full',
    attractsBees: true,
    image: '🌼'
  },
  {
    id: '4',
    name: 'Mogra (Jasmine)',
    scientificName: 'Jasminum sambac',
    season: 'Summer-Monsoon',
    water: 'high',
    sunlight: 'partial',
    attractsBees: true,
    image: '🌸'
  },
  {
    id: '5',
    name: 'Gulab (Rose)',
    scientificName: 'Rosa indica',
    season: 'Winter-Spring',
    water: 'medium',
    sunlight: 'full',
    attractsBees: true,
    image: '🌹'
  },
  {
    id: '6',
    name: 'Neem',
    scientificName: 'Azadirachta indica',
    season: 'Spring',
    water: 'low',
    sunlight: 'full',
    attractsBees: true,
    image: '🌳'
  },
  {
    id: '7',
    name: 'Champa (Frangipani)',
    scientificName: 'Plumeria rubra',
    season: 'Summer',
    water: 'low',
    sunlight: 'full',
    attractsBees: true,
    image: '🏵️'
  },
  {
    id: '8',
    name: 'Harsingar',
    scientificName: 'Nyctanthes arbor-tristis',
    season: 'Monsoon',
    water: 'medium',
    sunlight: 'partial',
    attractsBees: true,
    image: '🌺'
  }
];

export function DirectoryTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWater, setSelectedWater] = useState<string | null>(null);
  const [selectedSunlight, setSelectedSunlight] = useState<string | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filteredPlants = plants.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWater = !selectedWater || plant.water === selectedWater;
    const matchesSunlight = !selectedSunlight || plant.sunlight === selectedSunlight;
    return matchesSearch && matchesWater && matchesSunlight;
  });

  const handlePlantClick = (plant: Plant) => {
    setSelectedPlant(plant);
    setDetailsOpen(true);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <Card className="p-4 rounded-3xl bg-gradient-to-br from-green-600 to-emerald-700 text-white border-none">
        <h2>Plant Guide Directory</h2>
        <p className="text-green-100 text-sm mt-1">
          Discover bee-friendly plants for your community
        </p>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
        <Input
          type="text"
          placeholder="Search plants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-2xl border-stone-300"
        />
      </div>

      {/* Filters */}
      <Card className="p-3 rounded-2xl bg-white border-stone-200">
        <div className="flex items-center gap-2 mb-2">
          <Filter className="w-4 h-4 text-stone-600" />
          <span className="text-sm text-stone-700">Filters</span>
        </div>

        {/* Water Requirements */}
        <div className="mb-2">
          <div className="text-xs text-stone-600 mb-1.5 flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5" />
            Water
          </div>
          <div className="flex gap-1.5">
            {['low', 'medium', 'high'].map((level) => (
              <Button
                key={level}
                variant={selectedWater === level ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedWater(selectedWater === level ? null : level)}
                className={`rounded-full capitalize text-xs h-7 px-3 ${
                  selectedWater === level
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'hover:bg-blue-50'
                }`}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {/* Sunlight Requirements */}
        <div>
          <div className="text-xs text-stone-600 mb-1.5 flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5" />
            Sunlight
          </div>
          <div className="flex gap-1.5">
            {['full', 'partial', 'shade'].map((level) => (
              <Button
                key={level}
                variant={selectedSunlight === level ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSunlight(selectedSunlight === level ? null : level)}
                className={`rounded-full capitalize text-xs h-7 px-3 ${
                  selectedSunlight === level
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'hover:bg-amber-50'
                }`}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Plant Grid (Honeycomb inspired) */}
      <div className="grid grid-cols-2 gap-2.5">
        {filteredPlants.map((plant) => (
          <Card
            key={plant.id}
            onClick={() => handlePlantClick(plant)}
            className="p-3 rounded-xl bg-white border-stone-200 hover:shadow-lg hover:border-amber-300 transition-all cursor-pointer"
          >
            <div className="text-3xl text-center mb-1.5">{plant.image}</div>
            <h3 className="text-center text-stone-800 text-sm mb-0.5">{plant.name}</h3>
            <p className="text-xs text-stone-500 text-center mb-2 italic truncate">
              {plant.scientificName}
            </p>
            
            <div className="space-y-1.5">
              <Badge variant="secondary" className="w-full justify-center bg-green-100 text-green-700 hover:bg-green-100 rounded-full text-xs py-0.5">
                {plant.season}
              </Badge>
              
              <div className="flex gap-1 justify-center">
                <Badge variant="outline" className="rounded-full text-xs px-1.5 py-0">
                  <Droplets className="w-2.5 h-2.5 mr-0.5" />
                  {plant.water[0].toUpperCase()}
                </Badge>
                <Badge variant="outline" className="rounded-full text-xs px-1.5 py-0">
                  <Sun className="w-2.5 h-2.5 mr-0.5" />
                  {plant.sunlight[0].toUpperCase()}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredPlants.length === 0 && (
        <Card className="p-8 rounded-2xl bg-stone-50 border-stone-200">
          <p className="text-center text-stone-500">
            No plants match your filters. Try adjusting your search.
          </p>
        </Card>
      )}

      {/* Plant Detail View */}
      <PlantDetailView
        plant={selectedPlant}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}
