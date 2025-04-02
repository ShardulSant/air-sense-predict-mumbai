
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import AqiBadge from '@/components/AqiBadge';
import { getPollutantInfo } from '@/utils/aqiUtils';
import { AlertTriangle, Heart, AlertCircle, User, Users, Wind, ThermometerSun } from 'lucide-react';

const pollutants = ["PM2.5", "PM10", "NO2", "SO2", "Ozone", "CO"];

const HealthImpactCard = ({ aqiCategory, children }) => {
  const getImpactColor = () => {
    switch (aqiCategory) {
      case "Good": return "bg-green-100 text-green-800 border-green-200";
      case "Satisfactory": return "bg-lime-100 text-lime-800 border-lime-200";
      case "Moderate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Poor": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Very Poor": return "bg-red-100 text-red-800 border-red-200";
      case "Severe": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getImpactColor()} mb-4`}>
      <div className="flex items-center gap-2 mb-2">
        <AqiBadge category={aqiCategory} />
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
};

const PollutantInfoCard = ({ pollutantId }) => {
  const info = getPollutantInfo(pollutantId);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{info.fullName} ({info.name})</CardTitle>
        <CardDescription>Major air pollutant measured in {info.unit}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">What is it?</h4>
          <p className="text-gray-600 dark:text-gray-300">{info.description}</p>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="font-semibold mb-2">Sources</h4>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            {info.sources.map((source, index) => (
              <li key={index}>{source}</li>
            ))}
          </ul>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="font-semibold mb-2">Health Effects</h4>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            {info.healthEffects.map((effect, index) => (
              <li key={index}>{effect}</li>
            ))}
          </ul>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="font-semibold mb-2">Threshold Levels</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Good</span>
                <span>{info.threshold.good} {info.unit}</span>
              </div>
              <Progress value={20} className="h-2" indicatorClassName="bg-aqi-good" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Satisfactory</span>
                <span>{info.threshold.satisfactory} {info.unit}</span>
              </div>
              <Progress value={40} className="h-2" indicatorClassName="bg-aqi-satisfactory" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Moderate</span>
                <span>{info.threshold.moderate} {info.unit}</span>
              </div>
              <Progress value={60} className="h-2" indicatorClassName="bg-aqi-moderate" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Poor</span>
                <span>{info.threshold.poor} {info.unit}</span>
              </div>
              <Progress value={80} className="h-2" indicatorClassName="bg-aqi-poor" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Very Poor</span>
                <span>{info.threshold.veryPoor} {info.unit}</span>
              </div>
              <Progress value={90} className="h-2" indicatorClassName="bg-aqi-very-poor" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Severe</span>
                <span>{info.threshold.severe} {info.unit}</span>
              </div>
              <Progress value={100} className="h-2" indicatorClassName="bg-aqi-severe" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Health = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Air Quality & Health Impact</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Understand how air quality affects your health and learn how to protect yourself
          </p>
        </div>
        
        {/* Overview Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Heart className="h-6 w-6 mr-2 text-primary" />
                  Health Effects Overview
                </h2>
                <p className="mb-4">
                  Air pollution can cause both short-term (temporary) and long-term (chronic) health effects. It can affect your lungs, your heart, and other organs. The risk of harm depends on several factors, including the amount of pollution in the air, how much of the polluted air you breathe in, and your overall health.
                </p>
                <p>
                  People who may be more sensitive to air pollution include those with pre-existing heart or lung conditions, children, elderly, and pregnant women. Understanding the Air Quality Index (AQI) can help you make informed decisions about outdoor activities.
                </p>
              </div>
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Health Impact by Sensitivity Group</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">General Population</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Healthy individuals without respiratory conditions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Sensitive Groups</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        People with respiratory or heart conditions, children, and older adults
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">High-Risk Groups</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        People with severe respiratory conditions, very young children, and pregnant women
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* AQI Health Impact Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Health Impact by AQI Level</h2>
          
          <div className="space-y-6">
            <HealthImpactCard aqiCategory="Good">
              <p className="font-medium mb-2">Health Impact: Minimal or none</p>
              <p>Air quality is considered satisfactory, and air pollution poses little or no risk to public health.</p>
              <div className="mt-2">
                <strong>Recommendations:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li>Enjoy outdoor activities</li>
                  <li>Keep windows open for fresh air</li>
                  <li>No restrictions on activities</li>
                </ul>
              </div>
            </HealthImpactCard>
            
            <HealthImpactCard aqiCategory="Satisfactory">
              <p className="font-medium mb-2">Health Impact: Minor breathing discomfort to sensitive people</p>
              <p>Air quality is acceptable; however, there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.</p>
              <div className="mt-2">
                <strong>Recommendations:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li>Most people can continue normal activities</li>
                  <li>Sensitive individuals should monitor their condition</li>
                  <li>Consider reducing extended outdoor exertion if experiencing symptoms</li>
                </ul>
              </div>
            </HealthImpactCard>
            
            <HealthImpactCard aqiCategory="Moderate">
              <p className="font-medium mb-2">Health Impact: Breathing discomfort to people with lung disease, children, and older adults</p>
              <p>Members of sensitive groups may experience health effects. The general public is not likely to be affected.</p>
              <div className="mt-2">
                <strong>Recommendations:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li>Sensitive groups should reduce prolonged outdoor exertion</li>
                  <li>Take more breaks during outdoor activities</li>
                  <li>Consider indoor activities for children and elderly</li>
                  <li>People with respiratory or heart conditions should keep medication handy</li>
                </ul>
              </div>
            </HealthImpactCard>
            
            <HealthImpactCard aqiCategory="Poor">
              <p className="font-medium mb-2">Health Impact: Breathing discomfort to people on prolonged exposure</p>
              <p>Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.</p>
              <div className="mt-2">
                <strong>Recommendations:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li>Avoid prolonged or heavy exertion</li>
                  <li>Consider moving activities indoors</li>
                  <li>Use air purifiers indoors</li>
                  <li>Wear masks when outdoors</li>
                  <li>Sensitive groups should avoid outdoor activity</li>
                </ul>
              </div>
            </HealthImpactCard>
            
            <HealthImpactCard aqiCategory="Very Poor">
              <p className="font-medium mb-2">Health Impact: Respiratory illness to people on prolonged exposure</p>
              <p>Health warnings of emergency conditions. The entire population is more likely to be affected.</p>
              <div className="mt-2">
                <strong>Recommendations:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li>Avoid all outdoor physical activities</li>
                  <li>Keep windows and doors closed</li>
                  <li>Use air purifiers</li>
                  <li>Wear N95 masks if going outdoors</li>
                  <li>Sensitive groups should stay indoors</li>
                  <li>Consider running air conditioners with clean filters</li>
                </ul>
              </div>
            </HealthImpactCard>
            
            <HealthImpactCard aqiCategory="Severe">
              <p className="font-medium mb-2">Health Impact: Serious respiratory effects even during light physical activity</p>
              <p>Health alert: everyone may experience more serious health effects. This would trigger health warnings of emergency conditions.</p>
              <div className="mt-2">
                <strong>Recommendations:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li>Stay indoors and keep activity levels low</li>
                  <li>Close all windows and doors</li>
                  <li>Run air purifiers continuously</li>
                  <li>Wear N95 masks if you must go outside</li>
                  <li>Consider temporarily relocating if possible</li>
                  <li>Seek medical attention if experiencing symptoms</li>
                  <li>Schools and outdoor events should be canceled</li>
                </ul>
              </div>
            </HealthImpactCard>
          </div>
        </div>
        
        {/* Contributing Factors Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Factors Affecting Exposure Risk</CardTitle>
            <CardDescription>
              Various factors can influence how air pollution affects your health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
                    <span>Personal Sensitivity</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Some individuals are more sensitive to air pollution than others:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Children: Still developing lungs and higher breathing rates</li>
                    <li>Elderly: Weakened immune systems and potential pre-existing conditions</li>
                    <li>Pregnant women: Exposure can affect both mother and developing fetus</li>
                    <li>People with asthma, COPD, heart disease, or diabetes</li>
                    <li>Outdoor workers who spend long hours outside</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <ThermometerSun className="h-5 w-5 mr-2 text-primary" />
                    <span>Weather Conditions</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Weather can significantly affect air pollution levels:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Temperature inversions: Trap pollutants near the ground</li>
                    <li>Wind: Can disperse or concentrate pollutants</li>
                    <li>Humidity: Can increase the formation of certain pollutants</li>
                    <li>Sunlight: Contributes to the formation of ground-level ozone</li>
                    <li>Rainfall: Can wash particulate matter out of the air</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Wind className="h-5 w-5 mr-2 text-primary" />
                    <span>Activity Level</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Your activity level affects how much pollution you breathe in:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>During exercise: Breathing rate increases up to 10-20 times</li>
                    <li>Outdoor vs. indoor activities: Indoor air may be cleaner if filtered</li>
                    <li>Time of day: Pollution levels vary throughout the day</li>
                    <li>Duration: Longer exposure increases health risks</li>
                    <li>Location: Urban areas typically have higher pollution levels</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        
        {/* Pollutant Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Understanding Air Pollutants</h2>
          
          <Tabs defaultValue={pollutants[0]}>
            <TabsList className="w-full flex flex-wrap h-auto">
              {pollutants.map((pollutant) => (
                <TabsTrigger 
                  key={pollutant} 
                  value={pollutant}
                  className="flex-grow"
                >
                  {pollutant}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {pollutants.map((pollutant) => (
              <TabsContent key={pollutant} value={pollutant}>
                <PollutantInfoCard pollutantId={pollutant} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {/* Protection Measures */}
        <Card>
          <CardHeader>
            <CardTitle>Protecting Yourself from Air Pollution</CardTitle>
            <CardDescription>
              Practical steps to reduce your exposure to air pollution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Outdoor Protection</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Check the air quality index before going outside</li>
                  <li>Avoid outdoor activities during peak pollution hours</li>
                  <li>Choose less polluted routes for walking or cycling</li>
                  <li>Wear an appropriate mask (N95 or better) when pollution levels are high</li>
                  <li>Reduce strenuous activities when air quality is poor</li>
                  <li>Stay hydrated to help your body remove inhaled pollutants</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3">Indoor Protection</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Use air purifiers with HEPA filters</li>
                  <li>Keep windows closed during high pollution days</li>
                  <li>Use air conditioning with clean filters</li>
                  <li>Maintain good ventilation when cooking</li>
                  <li>Avoid burning candles, incense, or using wood stoves</li>
                  <li>Clean your home regularly to reduce dust accumulation</li>
                  <li>Consider adding air-purifying plants to your home</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Health;
