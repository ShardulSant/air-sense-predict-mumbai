
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LocationMarker, AirQualityData } from '@/types/airQuality';
import { fetchAirQuality } from '@/utils/aqiUtils';
import AqiBadge from './AqiBadge';
import { Loader2, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Fix for Leaflet icon issues
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

// Helper component to programmatically update map view
const SetView = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

interface LeafletMapProps {
  onSelectPrediction: (data: AirQualityData) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ onSelectPrediction }) => {
  const [markers, setMarkers] = useState<LocationMarker[]>([]);
  const [predictions, setPredictions] = useState<Record<string, AirQualityData>>({});
  const [mapCenter, setMapCenter] = useState<[number, number]>([19.0760, 72.8777]);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const featureGroupRef = useRef<L.FeatureGroup>(null);

  // Initialize the custom marker icon
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  const fetchAirQualityData = async (lat: number, lon: number) => {
    try {
      setLoadingPrediction(true);
      const data = await fetchAirQuality(lat, lon);
      
      setPredictions((prev) => ({
        ...prev,
        [`${lat},${lon}`]: data,
      }));
      
      onSelectPrediction(data);
      toast.success("Air quality prediction loaded successfully");
    } catch (error) {
      console.error('Error fetching air quality data:', error);
      toast.error("Failed to load air quality prediction");
    } finally {
      setLoadingPrediction(false);
    }
  };

  const handleDrawCreated = (e: any) => {
    const { layerType, layer } = e;
    if (layerType === 'marker') {
      const { lat, lng } = layer.getLatLng();
      setMarkers((prevMarkers) => [...prevMarkers, { lat, lon: lng }]);
      fetchAirQualityData(lat, lng);
    }
  };

  const handleDrawDeleted = (e: any) => {
    const layers = e.layers;
    layers.eachLayer((layer: any) => {
      const { lat, lng } = layer.getLatLng();
      setMarkers((prevMarkers) => prevMarkers.filter(marker => marker.lat !== lat || marker.lon !== lng));
    });
  };

  const clearMarkers = () => {
    setMarkers([]);
    setPredictions({});
    if (featureGroupRef.current) {
      featureGroupRef.current.clearLayers();
    }
    toast.info("All markers cleared");
  };

  const updateMapCenter = (location: { lat: number; lon: number }) => {
    setMapCenter([location.lat, location.lon]);
  };

  const mumbaiBounds = [
    [18.8900, 72.7750],
    [19.3000, 73.0000],
  ];

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
        maxBounds={mumbaiBounds as any}
        minZoom={11}
        className="z-0"
      >
        <SetView center={mapCenter} zoom={13} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topright"
            onCreated={handleDrawCreated}
            onDeleted={handleDrawDeleted}
            draw={{
              rectangle: false,
              polyline: false,
              circle: false,
              polygon: false,
              marker: true,
              circlemarker: false
            }}
            edit={{
              remove: true,
              edit: false
            }}
          />
          {markers.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lon]}>
              <Popup>
                <div className="text-sm">
                  <p className="font-medium mb-1">
                    Location: {marker.lat.toFixed(4)}, {marker.lon.toFixed(4)}
                  </p>
                  {predictions[`${marker.lat},${marker.lon}`]?.Aqi && (
                    <div className="mb-2">
                      <p className="font-bold mb-1">
                        AQI Category:
                      </p>
                      <AqiBadge 
                        category={predictions[`${marker.lat},${marker.lon}`].Aqi} 
                      />
                    </div>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => onSelectPrediction(predictions[`${marker.lat},${marker.lon}`])}
                  >
                    View Details
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </FeatureGroup>
      </MapContainer>
      
      <Card 
        className="absolute bottom-5 left-5 z-10 bg-white/90 backdrop-blur-sm"
      >
        <CardContent className="p-3 flex items-center gap-2">
          <p className="text-sm hidden sm:block">
            Click on map to add measurement points
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearMarkers}
            className="ml-auto"
            disabled={markers.length === 0}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </CardContent>
      </Card>

      {loadingPrediction && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-md shadow-lg flex items-center">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          <span>Loading prediction...</span>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
