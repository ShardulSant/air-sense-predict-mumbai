
import React, { useState } from 'react';
import { AirQualityData, AqiCategory } from '@/types/airQuality';
import { getCategoryValue, getAqiColorHex } from '@/utils/aqiUtils';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  RadarChart as RechartsRadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';

interface AqiChartsProps {
  data: AirQualityData;
}

const RadarChart = ({ data }: { data: AirQualityData }) => {
  const chartData = [
    { subject: 'PM2.5', A: data["PM2.5"] || 0, fullMark: 100 },
    { subject: 'PM10', A: data["PM10"] || 0, fullMark: 150 },
    { subject: 'NO', A: data["NO"] || 0, fullMark: 50 },
    { subject: 'NO2', A: data["NO2"] || 0, fullMark: 80 },
    { subject: 'SO2', A: data["SO2"] || 0, fullMark: 40 },
    { subject: 'Ozone', A: data["Ozone"] || 0, fullMark: 60 },
    { subject: 'CO', A: data["CO"] || 0, fullMark: 10 },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar name="Pollutant Values" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
};

const PollutantBarChart = ({ data }: { data: AirQualityData }) => {
  const chartData = [
    { name: 'PM2.5', value: data["PM2.5"] || 0 },
    { name: 'PM10', value: data["PM10"] || 0 },
    { name: 'NO2', value: data["NO2"] || 0 },
    { name: 'SO2', value: data["SO2"] || 0 },
    { name: 'Ozone', value: data["Ozone"] || 0 },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill={getAqiColorHex(data.Aqi)} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const AqiDonutChart = ({ aqiCategory }: { aqiCategory: AqiCategory }) => {
  const aqiValue = getCategoryValue(aqiCategory);
  const data = [
    { name: 'AQI', value: aqiValue },
    { name: 'Remaining', value: 300 - aqiValue },
  ];
  
  const COLORS = [getAqiColorHex(aqiCategory), '#e0e0e0'];

  return (
    <div className="relative w-full h-[250px]">
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
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <p className="text-2xl font-bold">{aqiCategory}</p>
        <p className="text-sm text-gray-500">AQI Category</p>
      </div>
    </div>
  );
};

const AqiCharts: React.FC<AqiChartsProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pollutant Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="radar">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="radar">Radar View</TabsTrigger>
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="donut">AQI Meter</TabsTrigger>
          </TabsList>
          <TabsContent value="radar">
            <RadarChart data={data} />
          </TabsContent>
          <TabsContent value="bar">
            <PollutantBarChart data={data} />
          </TabsContent>
          <TabsContent value="donut">
            <AqiDonutChart aqiCategory={data.Aqi} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AqiCharts;
