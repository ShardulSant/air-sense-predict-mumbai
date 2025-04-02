
import React from 'react';
import { AirQualityData, AqiCategory } from '@/types/airQuality';
import { getAqiColorHex, getRecommendations } from '@/utils/aqiUtils';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import AqiBadge from './AqiBadge';
import { getAqiTextColor } from '@/utils/aqiUtils';

interface AqiPanelProps {
  aqiCategory: AqiCategory;
}

const AqiPanel: React.FC<AqiPanelProps> = ({ aqiCategory }) => {
  // This is for the donut chart display
  const aqiValue = {
    "Good": 25,
    "Satisfactory": 75,
    "Moderate": 125,
    "Poor": 175,
    "Very Poor": 225,
    "Severe": 275,
    "Unknown": 0
  }[aqiCategory];
  
  const data = [
    { name: 'AQI', value: aqiValue },
    { name: 'Remaining', value: 300 - aqiValue },
  ];
  
  const COLORS = [getAqiColorHex(aqiCategory), '#e0e0e0'];
  
  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
            <div className="relative w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <AqiBadge category={aqiCategory} size="lg" />
                <p className="text-sm text-gray-500 mt-1">AQI Level</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <h3 className="text-xl font-bold mb-2">Air Quality Summary</h3>
            <p className="text-gray-700 mb-4">
              {getRecommendations(aqiCategory)}
            </p>
            
            <h4 className="text-lg font-semibold mb-2">Recommended Actions:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {aqiCategory === "Good" && (
                <>
                  <li>Enjoy outdoor activities</li>
                  <li>Keep windows open for fresh air</li>
                  <li>No restrictions on activities</li>
                </>
              )}
              
              {aqiCategory === "Satisfactory" && (
                <>
                  <li>Most people can continue normal activities</li>
                  <li>Sensitive individuals should monitor their condition</li>
                  <li>Consider reducing extended outdoor exertion if experiencing symptoms</li>
                </>
              )}
              
              {aqiCategory === "Moderate" && (
                <>
                  <li>Sensitive groups should reduce prolonged outdoor exertion</li>
                  <li>Take more breaks during outdoor activities</li>
                  <li>Consider indoor activities for children and elderly</li>
                </>
              )}
              
              {aqiCategory === "Poor" && (
                <>
                  <li>Avoid prolonged or heavy exertion</li>
                  <li>Consider moving activities indoors</li>
                  <li>Use air purifiers indoors</li>
                  <li>Wear masks when outdoors</li>
                </>
              )}
              
              {aqiCategory === "Very Poor" && (
                <>
                  <li>Avoid all outdoor physical activities</li>
                  <li>Keep windows and doors closed</li>
                  <li>Use air purifiers</li>
                  <li>Wear N95 masks if going outdoors</li>
                  <li>Sensitive groups should stay indoors</li>
                </>
              )}
              
              {aqiCategory === "Severe" && (
                <>
                  <li>Stay indoors and keep activity levels low</li>
                  <li>Close all windows and doors</li>
                  <li>Run air purifiers continuously</li>
                  <li>Wear N95 masks if you must go outside</li>
                  <li>Consider temporarily relocating if possible</li>
                  <li>Seek medical attention if experiencing symptoms</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AqiPanel;
