import { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { MapPin, Flower2, Phone, Mail, User } from 'lucide-react';
import { Button } from './ui/button';

interface Beekeeper {
  name: string;
  phone: string;
  email: string;
  experience: string;
  village: string;
}

interface MapNode {
  id: string;
  x: number;
  y: number;
  type: 'tower' | 'apiary';
  name: string;
  community: string;
  sectorId: string;
  plants?: number;
  hives?: number;
  activity?: number;
  beekeeper?: Beekeeper;
}

interface MapTabProps {
  beekeepers: { [apiaryId: string]: Beekeeper };
  onViewBeekeeperProfile?: (beekeeper: Beekeeper) => void;
}

// Create sectors - each sector has 1 apiary + 5 bee towers (Madhu Kendra)
const createSectors = (beekeepers: { [apiaryId: string]: Beekeeper }) => [
  // Sector 1 - Dharampur Gaon (Top Left)
  {
    id: 'sector-1',
    community: 'Dharampur Gaon',
    color: '#f59e0b',
    hexCenter: { x: 200, y: 150 },
    nodes: [
      { id: 'n1-apiary', x: 200, y: 150, type: 'apiary' as const, name: 'Mukhya Madhu Kosh', hives: 12, activity: 94, beekeeper: beekeepers['n1-apiary'] },
      { id: 'n1-t1', x: 120, y: 100, type: 'tower' as const, name: 'Madhu Kendra A1', plants: 45, activity: 87 },
      { id: 'n1-t2', x: 280, y: 100, type: 'tower' as const, name: 'Madhu Kendra A2', plants: 52, activity: 91 },
      { id: 'n1-t3', x: 120, y: 200, type: 'tower' as const, name: 'Madhu Kendra A3', plants: 38, activity: 85 },
      { id: 'n1-t4', x: 280, y: 200, type: 'tower' as const, name: 'Madhu Kendra A4', plants: 41, activity: 89 },
      { id: 'n1-t5', x: 200, y: 240, type: 'tower' as const, name: 'Madhu Kendra A5', plants: 47, activity: 92 },
    ],
  },
  // Sector 2 - Haripur Village (Top Right)
  {
    id: 'sector-2',
    community: 'Haripur Village',
    color: '#22c55e',
    hexCenter: { x: 500, y: 150 },
    nodes: [
      { id: 'n2-apiary', x: 500, y: 150, type: 'apiary' as const, name: 'Purva Madhu Kosh', hives: 10, activity: 89, beekeeper: beekeepers['n2-apiary'] },
      { id: 'n2-t1', x: 420, y: 100, type: 'tower' as const, name: 'Madhu Kendra B1', plants: 43, activity: 84 },
      { id: 'n2-t2', x: 580, y: 100, type: 'tower' as const, name: 'Madhu Kendra B2', plants: 49, activity: 88 },
      { id: 'n2-t3', x: 420, y: 200, type: 'tower' as const, name: 'Madhu Kendra B3', plants: 36, activity: 82 },
      { id: 'n2-t4', x: 580, y: 200, type: 'tower' as const, name: 'Madhu Kendra B4', plants: 44, activity: 86 },
      { id: 'n2-t5', x: 500, y: 240, type: 'tower' as const, name: 'Madhu Kendra B5', plants: 51, activity: 90 },
    ],
  },
  // Sector 3 - Nandgaon (Bottom Center)
  {
    id: 'sector-3',
    community: 'Nandgaon',
    color: '#3b82f6',
    hexCenter: { x: 350, y: 400 },
    nodes: [
      { id: 'n3-apiary', x: 350, y: 400, type: 'apiary' as const, name: 'Dakshin Madhu Kosh', hives: 15, activity: 96, beekeeper: beekeepers['n3-apiary'] },
      { id: 'n3-t1', x: 270, y: 340, type: 'tower' as const, name: 'Madhu Kendra C1', plants: 55, activity: 93 },
      { id: 'n3-t2', x: 430, y: 340, type: 'tower' as const, name: 'Madhu Kendra C2', plants: 48, activity: 91 },
      { id: 'n3-t3', x: 270, y: 460, type: 'tower' as const, name: 'Madhu Kendra C3', plants: 42, activity: 88 },
      { id: 'n3-t4', x: 430, y: 460, type: 'tower' as const, name: 'Madhu Kendra C4', plants: 46, activity: 90 },
      { id: 'n3-t5', x: 350, y: 510, type: 'tower' as const, name: 'Madhu Kendra C5', plants: 53, activity: 94 },
    ],
  },
];

// Function to generate rounded hexagon path
const createRoundedHexagon = (cx: number, cy: number, size: number, radius: number = 10) => {
  const angles = [0, 60, 120, 180, 240, 300];
  const points = angles.map(angle => ({
    x: cx + size * Math.cos((angle * Math.PI) / 180),
    y: cy + size * Math.sin((angle * Math.PI) / 180)
  }));
  
  let path = `M ${points[0].x + radius},${points[0].y}`;
  
  for (let i = 0; i < 6; i++) {
    const current = points[i];
    const next = points[(i + 1) % 6];
    const angle = Math.atan2(next.y - current.y, next.x - current.x);
    
    const controlX1 = current.x + radius * Math.cos(angle);
    const controlY1 = current.y + radius * Math.sin(angle);
    const controlX2 = next.x - radius * Math.cos(angle);
    const controlY2 = next.y - radius * Math.sin(angle);
    
    path += ` L ${controlX1},${controlY1}`;
    path += ` Q ${next.x},${next.y} ${controlX2},${controlY2}`;
  }
  
  path += ' Z';
  return path;
};

export function MapTab({ beekeepers, onViewBeekeeperProfile }: MapTabProps) {
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sectors = createSectors(beekeepers);

  const handleNodeClick = (sector: typeof sectors[0], node: typeof sectors[0]['nodes'][0]) => {
    setSelectedNode({
      ...node,
      community: sector.community,
      sectorId: sector.id,
    });
    setDialogOpen(true);
  };

  const getTouchDistance = (touches: TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setLastTouchDistance(getTouchDistance(e.touches));
    } else if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDistance) {
      const newDistance = getTouchDistance(e.touches);
      const delta = newDistance - lastTouchDistance;
      const zoomFactor = 1 + delta * 0.01;
      setZoom(Math.max(0.5, Math.min(3, zoom * zoomFactor)));
      setLastTouchDistance(newDistance);
    } else if (e.touches.length === 1 && isDragging) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastTouchDistance(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(Math.max(0.5, Math.min(3, zoom * zoomFactor)));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 pb-3">
        <Card className="p-4 rounded-3xl bg-gradient-to-br from-green-600 to-emerald-700 text-white border-none shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2>Madhu Kendra Network</h2>
              <p className="text-green-100 text-sm mt-1">
                Pinch to zoom • Drag to explore
              </p>
            </div>
            <Badge className="bg-green-800 hover:bg-green-800 rounded-full shadow-md">
              Live
            </Badge>
          </div>
        </Card>
      </div>

      {/* Interactive Map */}
      <div className="flex-1 px-4 pb-3 overflow-hidden">
        <Card className="h-full rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-green-50 border-2 border-stone-200 overflow-hidden relative shadow-inner">
          <div
            ref={containerRef}
            className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} touch-none`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 700 600"
              className="w-full h-full"
            >
              <defs>
                <radialGradient id="apiaryGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
                </radialGradient>
                
                <radialGradient id="towerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#86efac" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="1" />
                </radialGradient>

                <pattern id="honeycomb" x="0" y="0" width="50" height="43.4" patternUnits="userSpaceOnUse">
                  <path d="M25 0 L37.5 7.2 L37.5 21.7 L25 28.9 L12.5 21.7 L12.5 7.2 Z" 
                        fill="none" 
                        stroke="#fcd34d" 
                        strokeWidth="0.5" 
                        opacity="0.2" />
                </pattern>
              </defs>

              <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                <rect width="700" height="600" fill="url(#honeycomb)" />

                {/* Render each sector */}
                {sectors.map((sector) => {
                  const apiary = sector.nodes.find((n) => n.type === 'apiary');
                  
                  return (
                    <g key={sector.id}>
                      {/* Hexagon background area */}
                      {sector.hexCenter && (
                        <>
                          <path
                            d={createRoundedHexagon(sector.hexCenter.x, sector.hexCenter.y, 140, 15)}
                            fill={sector.color}
                            opacity="0.08"
                            stroke={sector.color}
                            strokeWidth="2"
                            strokeOpacity="0.2"
                          />
                          <path
                            d={createRoundedHexagon(sector.hexCenter.x, sector.hexCenter.y, 145, 15)}
                            fill="none"
                            stroke={sector.color}
                            strokeWidth="1.5"
                            strokeOpacity="0.3"
                            strokeDasharray="8 4"
                          />
                        </>
                      )}

                      {/* Connection lines within sector */}
                      {sector.nodes.map((node) => {
                        if (node.type === 'tower' && apiary) {
                          return (
                            <line
                              key={`line-${node.id}`}
                              x1={apiary.x}
                              y1={apiary.y}
                              x2={node.x}
                              y2={node.y}
                              stroke={sector.color}
                              strokeWidth="3"
                              strokeDasharray="6 4"
                              opacity="0.5"
                              className="transition-all"
                            />
                          );
                        }
                        return null;
                      })}

                      {/* Nodes as circles */}
                      {sector.nodes.map((node) => {
                        const isApiary = node.type === 'apiary';
                        const radius = isApiary ? 28 : 20;
                        const hasBeekeeper = isApiary && node.beekeeper;

                        return (
                          <g
                            key={node.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNodeClick(sector, node);
                            }}
                            className="cursor-pointer transition-all hover:opacity-90"
                          >
                            {/* Glow effect */}
                            <circle
                              cx={node.x}
                              cy={node.y}
                              r={radius + 8}
                              fill={isApiary ? '#fef3c7' : '#dcfce7'}
                              opacity="0.4"
                              className="animate-pulse"
                            />
                            
                            {/* Main circle node */}
                            <circle
                              cx={node.x}
                              cy={node.y}
                              r={radius}
                              fill={isApiary ? 'url(#apiaryGlow)' : 'url(#towerGlow)'}
                              stroke="white"
                              strokeWidth="4"
                              className="hover:brightness-110 transition-all drop-shadow-lg"
                            />
                            
                            {/* Icon */}
                            <text
                              x={node.x}
                              y={node.y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fontSize={isApiary ? "24" : "18"}
                            >
                              {isApiary ? '🏺' : '🏛️'}
                            </text>

                            {/* Beekeeper badge for apiaries */}
                            {hasBeekeeper && (
                              <circle
                                cx={node.x - radius + 6}
                                cy={node.y - radius + 6}
                                r="8"
                                fill="#10b981"
                                stroke="white"
                                strokeWidth="2.5"
                                className="drop-shadow"
                              />
                            )}

                            {/* Activity indicator */}
                            <circle
                              cx={node.x + radius - 6}
                              cy={node.y - radius + 6}
                              r="7"
                              fill={node.activity && node.activity > 90 ? '#10b981' : '#fbbf24'}
                              stroke="white"
                              strokeWidth="2.5"
                              className="drop-shadow"
                            />

                            {/* Label */}
                            <text
                              x={node.x}
                              y={node.y + radius + 18}
                              textAnchor="middle"
                              fontSize="11"
                              fill="#78716c"
                              className="pointer-events-none"
                            >
                              {node.name.split(' ').slice(-1)[0]}
                            </text>
                          </g>
                        );
                      })}

                      {/* Sector label */}
                      {sector.hexCenter && (
                        <text
                          x={sector.hexCenter.x}
                          y={sector.hexCenter.y - 165}
                          textAnchor="middle"
                          fontSize="16"
                          fill={sector.color}
                          className="pointer-events-none"
                          style={{ textShadow: '0 1px 3px rgba(255,255,255,0.8)' }}
                        >
                          {sector.community}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
        </Card>
      </div>

      {/* Stats */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border-amber-300 text-center shadow-md">
            <div className="text-2xl mb-1">🌾</div>
            <div className="text-xl text-amber-900">3</div>
            <div className="text-xs text-amber-800">Villages</div>
          </Card>
          <Card className="p-4 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 border-orange-300 text-center shadow-md">
            <div className="text-2xl mb-1">🏺</div>
            <div className="text-xl text-orange-900">3</div>
            <div className="text-xs text-orange-800">Madhu Kosh</div>
          </Card>
          <Card className="p-4 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 border-green-300 text-center shadow-md">
            <div className="text-2xl mb-1">🏛️</div>
            <div className="text-xl text-green-900">15</div>
            <div className="text-xs text-green-800">Madhu Kendra</div>
          </Card>
        </div>
      </div>

      {/* Node Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">
                {selectedNode?.type === 'apiary' ? '🏺' : '🏛️'}
              </span>
              {selectedNode?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedNode && (
            <div className="space-y-3">
              <Card className="p-3 rounded-xl bg-stone-50 border-stone-200">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-stone-500" />
                  <span className="text-stone-700">{selectedNode.community}</span>
                </div>
              </Card>

              {selectedNode.type === 'apiary' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="p-4 rounded-xl bg-amber-50 border-amber-200">
                      <div className="text-3xl text-amber-700 mb-1">{selectedNode.hives}</div>
                      <div className="text-xs text-stone-600">Active Hives</div>
                    </Card>
                    <Card className="p-4 rounded-xl bg-green-50 border-green-200">
                      <div className="text-3xl text-green-700">{selectedNode.activity}%</div>
                      <div className="text-xs text-stone-600">Activity</div>
                    </Card>
                  </div>

                  {/* Beekeeper Information */}
                  {selectedNode.beekeeper ? (
                    <Card className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                      <h4 className="text-green-900 mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Beekeeper
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-green-700" />
                          <span className="text-sm text-green-900">{selectedNode.beekeeper.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-green-700" />
                          <a href={`tel:${selectedNode.beekeeper.phone}`} className="text-sm text-green-900 hover:underline">
                            {selectedNode.beekeeper.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-green-700" />
                          <a href={`mailto:${selectedNode.beekeeper.email}`} className="text-sm text-green-900 hover:underline">
                            {selectedNode.beekeeper.email}
                          </a>
                        </div>
                        <div className="text-xs text-green-800 mt-2">
                          Experience: {selectedNode.beekeeper.experience}
                        </div>
                        {onViewBeekeeperProfile && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-2 rounded-xl border-green-300 hover:bg-green-100"
                            onClick={() => onViewBeekeeperProfile(selectedNode.beekeeper!)}
                          >
                            View Full Profile
                          </Button>
                        )}
                      </div>
                    </Card>
                  ) : (
                    <Card className="p-4 rounded-xl bg-amber-50 border-amber-200">
                      <p className="text-sm text-amber-900 text-center">
                        ⚠️ No beekeeper assigned yet
                      </p>
                    </Card>
                  )}

                  <Card className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
                    <p className="text-sm text-orange-900">
                      🍯 This Madhu Kosh serves as the central hub, managing {selectedNode.hives} active beehives.
                    </p>
                  </Card>
                </>
              )}

              {selectedNode.type === 'tower' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="p-4 rounded-xl bg-green-50 border-green-200">
                      <div className="flex items-center gap-1 mb-2">
                        <Flower2 className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-3xl text-green-700 mb-1">{selectedNode.plants}</div>
                      <div className="text-xs text-stone-600">Plants</div>
                    </Card>
                    <Card className="p-4 rounded-xl bg-blue-50 border-blue-200">
                      <div className="text-3xl text-blue-700 mb-1">{selectedNode.activity}%</div>
                      <div className="text-xs text-stone-600">Activity</div>
                    </Card>
                  </div>
                  <Card className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <p className="text-sm text-green-900">
                      🌺 This Madhu Kendra maintains {selectedNode.plants} flowering plants and shows {selectedNode.activity}% bee activity rate.
                    </p>
                  </Card>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
