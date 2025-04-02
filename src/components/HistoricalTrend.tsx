
import React from 'react';
import { AqiCategory } from '@/types/airQuality';
import { getCategoryValue, getAqiColorHex } from '@/utils/aqiUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface HistoricalDataPoint {
  name: string;
  aqiCategory: AqiCategory;
}

interface HistoricalTrendProps {
  data: HistoricalDataPoint[];
}

const HistoricalTrend: React.FC<HistoricalTrendProps> = ({ data }) => {
  // Convert categorical AQI to numeric values for charting
  const chartData = data.map(item => ({
    ...item,
    aqiValue: getCategoryValue(item.aqiCategory)
  }));

  // Custom tooltip to show categorical values instead of numeric
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const aqiValue = payload[0].value;
      let aqiCategory: AqiCategory = "Unknown";
      
      if (aqiValue <= 50) aqiCategory = "Good";
      else if (aqiValue <= 100) aqiCategory = "Satisfactory";
      else if (aqiValue <= 150) aqiCategory = "Moderate";
      else if (aqiValue <= 200) aqiCategory = "Poor";
      else if (aqiValue <= 250) aqiCategory = "Very Poor";
      else aqiCategory = "Severe";
      
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
          <p className="text-sm font-bold">{`Day: ${label}`}</p>
          <p className="text-sm" style={{ color: getAqiColorHex(aqiCategory) }}>
            {`AQI: ${aqiCategory}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical AQI Trend (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => {
                if (value === 25) return "Good";
                if (value === 75) return "Satisfactory";
                if (value === 125) return "Moderate";
                if (value === 175) return "Poor";
                if (value === 225) return "Very Poor";
                if (value === 275) return "Severe";
                return "";
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="aqiValue" 
              name="AQI Category"
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HistoricalTrend;
