
import React from 'react';
import { AirQualityData } from '@/types/airQuality';
import { getPollutantInfo } from '@/utils/aqiUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PollutantCardsProps {
  data: AirQualityData;
}

const PollutantCard = ({ pollutantId, value }: { pollutantId: string; value: number }) => {
  const info = getPollutantInfo(pollutantId);
  
  // Calculate progress percentage based on the severe threshold
  const progressPercentage = Math.min(Math.round((value / info.threshold.severe) * 100), 100);
  
  // Determine the color based on thresholds
  let progressColor = "bg-aqi-good";
  if (value > info.threshold.veryPoor) progressColor = "bg-aqi-severe";
  else if (value > info.threshold.poor) progressColor = "bg-aqi-very-poor";
  else if (value > info.threshold.moderate) progressColor = "bg-aqi-poor";
  else if (value > info.threshold.satisfactory) progressColor = "bg-aqi-moderate";
  else if (value > info.threshold.good) progressColor = "bg-aqi-satisfactory";
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">{info.name}</h3>
          <span className="text-sm text-gray-500">{info.unit}</span>
        </div>
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-xl font-bold">{value.toFixed(1)}</span>
          <span className="text-xs text-gray-500">{info.fullName}</span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-2 mt-2"
          indicatorClassName={progressColor}
        />
      </CardContent>
    </Card>
  );
};

const PollutantCards: React.FC<PollutantCardsProps> = ({ data }) => {
  // Filter out undefined values and the Aqi property
  const pollutants = Object.entries(data)
    .filter(([key, value]) => key !== "Aqi" && value !== undefined)
    .map(([key, value]) => ({ id: key, value: Number(value) }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {pollutants.map((pollutant) => (
        <PollutantCard 
          key={pollutant.id} 
          pollutantId={pollutant.id} 
          value={pollutant.value} 
        />
      ))}
    </div>
  );
};

export default PollutantCards;
