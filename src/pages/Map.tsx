
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import LeafletMap from '@/components/LeafletMap';
import LocationSearch from '@/components/LocationSearch';
import { AirQualityData } from '@/types/airQuality';
import { MapPin, ChevronRight, Loader2 } from 'lucide-react';
import AqiPanel from '@/components/AqiPanel';
import AqiCharts from '@/components/AqiCharts';
import PollutantCards from '@/components/PollutantCards';
import HistoricalTrend from '@/components/HistoricalTrend';
import { getHistoricalData } from '@/utils/aqiUtils';

const Map = () => {
  const [selectedPrediction, setSelectedPrediction] = useState<AirQualityData | null>(null);
  
  const handleLocationSelect = (location: { lat: number; lon: number }) => {
    // This would typically fetch data for the selected location
    console.log("Selected location:", location);
  };
  
  return (
    <Layout hideFooter>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Search bar and header */}
        <div className="p-4 bg-white dark:bg-gray-950 shadow-sm z-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center text-lg font-semibold">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              <h1>Air Quality Map</h1>
            </div>
            <div className="w-full sm:w-96">
              <LocationSearch onLocationSelect={handleLocationSelect} />
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Map Section - Left Side */}
          <div className="w-full lg:w-2/3 h-[400px] lg:h-full relative">
            <LeafletMap onSelectPrediction={setSelectedPrediction} />
          </div>
          
          {/* Results Area - Right Side */}
          <div className="w-full lg:w-1/3 h-full overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4">
            {!selectedPrediction ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <MapPin className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Location Selected</h2>
                <p className="text-muted-foreground max-w-md">
                  Click anywhere on the map to place a marker and get air quality prediction for that location.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <span>Air Quality Results</span>
                  <ChevronRight className="h-5 w-5 mx-1" />
                  <span className="text-primary">{selectedPrediction.Aqi}</span>
                </h2>
                
                <AqiPanel aqiCategory={selectedPrediction.Aqi} />
                
                <AqiCharts data={selectedPrediction} />
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Pollutant Levels</h3>
                  <PollutantCards data={selectedPrediction} />
                </div>
                
                <HistoricalTrend data={getHistoricalData()} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Map;
