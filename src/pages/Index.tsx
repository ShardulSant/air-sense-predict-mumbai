
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { MapPin, BarChart2, Info, Heart, ArrowRight } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              <span className="text-primary">Air</span>Sense<span className="text-primary">Mumbai</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real-time air quality predictions and health recommendations for Mumbai residents.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/map">
                  Explore Air Quality Map
                  <MapPin className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* AQI Legend */}
        <div className="max-w-5xl mx-auto mt-16 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Air Quality Index (AQI) Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-aqi-good text-black p-3 rounded text-center">
                <p className="font-semibold">Good</p>
                <p className="text-xs mt-1">0-50</p>
              </div>
              <div className="bg-aqi-satisfactory text-black p-3 rounded text-center">
                <p className="font-semibold">Satisfactory</p>
                <p className="text-xs mt-1">51-100</p>
              </div>
              <div className="bg-aqi-moderate text-black p-3 rounded text-center">
                <p className="font-semibold">Moderate</p>
                <p className="text-xs mt-1">101-200</p>
              </div>
              <div className="bg-aqi-poor text-white p-3 rounded text-center">
                <p className="font-semibold">Poor</p>
                <p className="text-xs mt-1">201-300</p>
              </div>
              <div className="bg-aqi-very-poor text-white p-3 rounded text-center">
                <p className="font-semibold">Very Poor</p>
                <p className="text-xs mt-1">301-400</p>
              </div>
              <div className="bg-aqi-severe text-white p-3 rounded text-center">
                <p className="font-semibold">Severe</p>
                <p className="text-xs mt-1">401-500</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Key Features</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Tools and insights to help you understand air quality in Mumbai
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Map Card */}
            <Card className="transform transition-all hover:scale-105">
              <CardHeader>
                <MapPin className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Interactive Map</CardTitle>
                <CardDescription>
                  Explore air quality predictions across Mumbai with our interactive map
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Place markers anywhere in Mumbai to get real-time air quality predictions and health recommendations.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/map">
                    Open Map
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Historical Data Card */}
            <Card className="transform transition-all hover:scale-105">
              <CardHeader>
                <BarChart2 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Historical Data</CardTitle>
                <CardDescription>
                  View air quality trends and historical data for different areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Analyze air quality trends over time and compare different locations to understand pollution patterns.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/history">
                    View Trends
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Health Impact Card */}
            <Card className="transform transition-all hover:scale-105">
              <CardHeader>
                <Heart className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Health Impact</CardTitle>
                <CardDescription>
                  Understand how air quality affects your health and get recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Learn about the health effects of different pollutants and get personalized recommendations based on air quality.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/health">
                    Health Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Start Monitoring Air Quality Today
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Make informed decisions about your outdoor activities based on real-time air quality data
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link to="/map">
              Explore Mumbai Air Quality Map
              <MapPin className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
