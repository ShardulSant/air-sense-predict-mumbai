
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AqiCategory } from '@/types/airQuality';
import { getAqiColorHex, getCategoryValue } from '@/utils/aqiUtils';
import AqiBadge from '@/components/AqiBadge';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

// Mock data for historical air quality
const monthlyData = [
  { month: 'Jan', pm25: 45, pm10: 70, no2: 30, so2: 15, ozone: 35, aqi: "Moderate" },
  { month: 'Feb', pm25: 55, pm10: 80, no2: 35, so2: 20, ozone: 40, aqi: "Moderate" },
  { month: 'Mar', pm25: 40, pm10: 65, no2: 25, so2: 10, ozone: 30, aqi: "Satisfactory" },
  { month: 'Apr', pm25: 35, pm10: 60, no2: 20, so2: 8, ozone: 25, aqi: "Satisfactory" },
  { month: 'May', pm25: 30, pm10: 55, no2: 18, so2: 5, ozone: 20, aqi: "Good" },
  { month: 'Jun', pm25: 25, pm10: 45, no2: 15, so2: 5, ozone: 18, aqi: "Good" },
  { month: 'Jul', pm25: 20, pm10: 40, no2: 12, so2: 4, ozone: 15, aqi: "Good" },
  { month: 'Aug', pm25: 25, pm10: 50, no2: 18, so2: 6, ozone: 22, aqi: "Good" },
  { month: 'Sep', pm25: 35, pm10: 65, no2: 25, so2: 10, ozone: 30, aqi: "Satisfactory" },
  { month: 'Oct', pm25: 45, pm10: 75, no2: 35, so2: 15, ozone: 35, aqi: "Moderate" },
  { month: 'Nov', pm25: 60, pm10: 95, no2: 45, so2: 20, ozone: 45, aqi: "Poor" },
  { month: 'Dec', pm25: 55, pm10: 85, no2: 40, so2: 18, ozone: 40, aqi: "Moderate" },
];

// Mock location data for different areas in Mumbai
const locations = [
  { id: 'andheri', name: 'Andheri', lat: 19.1136, lon: 72.8697 },
  { id: 'bandra', name: 'Bandra', lat: 19.0596, lon: 72.8295 },
  { id: 'colaba', name: 'Colaba', lat: 18.9067, lon: 72.8147 },
  { id: 'dadar', name: 'Dadar', lat: 19.0178, lon: 72.8478 },
  { id: 'juhu', name: 'Juhu', lat: 19.0878, lon: 72.8296 },
];

// Mock data for AQI distribution
const aqiDistribution = [
  { name: 'Good', value: 20 },
  { name: 'Satisfactory', value: 30 },
  { name: 'Moderate', value: 25 },
  { name: 'Poor', value: 15 },
  { name: 'Very Poor', value: 8 },
  { name: 'Severe', value: 2 },
];

const History = () => {
  const [selectedLocation, setSelectedLocation] = useState('andheri');
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Get colors for AQI categories
  const COLORS = aqiDistribution.map(item => 
    getAqiColorHex(item.name as AqiCategory)
  );
  
  // Convert categorical AQI to numeric values for chart
  const chartData = monthlyData.map(item => ({
    ...item,
    aqiValue: getCategoryValue(item.aqi as AqiCategory)
  }));
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Historical Air Quality Data</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Analyze air quality trends over time across different locations in Mumbai
          </p>
        </div>
        
        {/* Filter Controls */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium mb-2">Select Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location.id} value={location.id}>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-primary" />
                          {location.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium mb-2">Select Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : 'Select a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="w-full md:w-1/3 md:self-end">
                <Button className="w-full">
                  Update Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Data Visualization Tabs */}
        <Tabs defaultValue="trends" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends">AQI Trends</TabsTrigger>
            <TabsTrigger value="pollutants">Pollutants</TabsTrigger>
            <TabsTrigger value="distribution">AQI Distribution</TabsTrigger>
          </TabsList>
          
          {/* AQI Trends Tab */}
          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>AQI Trends (2023)</CardTitle>
                <CardDescription>
                  Monthly air quality index trends for {locations.find(loc => loc.id === selectedLocation)?.name || 'Selected Location'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
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
                      <Tooltip 
                        formatter={(value, name) => {
                          if (name === "aqiValue") {
                            const val = Number(value);
                            if (val <= 50) return ["Good", "AQI Category"];
                            if (val <= 100) return ["Satisfactory", "AQI Category"];
                            if (val <= 150) return ["Moderate", "AQI Category"];
                            if (val <= 200) return ["Poor", "AQI Category"];
                            if (val <= 250) return ["Very Poor", "AQI Category"];
                            return ["Severe", "AQI Category"];
                          }
                          return [value, name];
                        }}
                      />
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
                </div>
                
                {/* AQI Category Legend */}
                <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-2">
                  {["Good", "Satisfactory", "Moderate", "Poor", "Very Poor", "Severe"].map((category) => (
                    <div key={category} className="flex items-center">
                      <AqiBadge category={category as AqiCategory} size="sm" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Pollutants Tab */}
          <TabsContent value="pollutants">
            <Card>
              <CardHeader>
                <CardTitle>Pollutant Levels (2023)</CardTitle>
                <CardDescription>
                  Monthly pollutant levels for {locations.find(loc => loc.id === selectedLocation)?.name || 'Selected Location'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pm25" name="PM2.5" fill="#8884d8" />
                      <Bar dataKey="pm10" name="PM10" fill="#82ca9d" />
                      <Bar dataKey="no2" name="NO2" fill="#ffc658" />
                      <Bar dataKey="so2" name="SO2" fill="#ff8042" />
                      <Bar dataKey="ozone" name="Ozone" fill="#0088fe" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* AQI Distribution Tab */}
          <TabsContent value="distribution">
            <Card>
              <CardHeader>
                <CardTitle>AQI Category Distribution (2023)</CardTitle>
                <CardDescription>
                  Distribution of air quality categories for {locations.find(loc => loc.id === selectedLocation)?.name || 'Selected Location'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={aqiDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {aqiDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} days`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Data Table Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly AQI Summary (2023)</CardTitle>
            <CardDescription>
              Summary of air quality categories by month for {locations.find(loc => loc.id === selectedLocation)?.name || 'Selected Location'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="p-2 text-left">Month</th>
                    <th className="p-2 text-left">PM2.5</th>
                    <th className="p-2 text-left">PM10</th>
                    <th className="p-2 text-left">NO2</th>
                    <th className="p-2 text-left">SO2</th>
                    <th className="p-2 text-left">Ozone</th>
                    <th className="p-2 text-left">AQI Category</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((item, index) => (
                    <tr key={index} className="border-b dark:border-gray-700">
                      <td className="p-2">{item.month}</td>
                      <td className="p-2">{item.pm25}</td>
                      <td className="p-2">{item.pm10}</td>
                      <td className="p-2">{item.no2}</td>
                      <td className="p-2">{item.so2}</td>
                      <td className="p-2">{item.ozone}</td>
                      <td className="p-2">
                        <AqiBadge category={item.aqi as AqiCategory} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default History;
