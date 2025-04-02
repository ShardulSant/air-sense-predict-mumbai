
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Mail, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">About AirSenseMumbai</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Learn about our mission to improve air quality awareness in Mumbai
          </p>
        </div>
        
        {/* Mission Section */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AirSenseMumbai aims to provide accurate, accessible, and actionable air quality information to Mumbai residents, empowering them to make informed decisions about their daily activities and long-term health.
              </p>
              <Separator className="my-6" />
              <p className="italic text-gray-500 dark:text-gray-400">
                "Clean air is a basic human right. Our goal is to make air quality data understandable and useful for everyone in Mumbai."
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* About the Project */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>About the Project</CardTitle>
                <CardDescription>The technology and methodology behind AirSenseMumbai</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  AirSenseMumbai is a comprehensive air quality monitoring and prediction platform specifically designed for Mumbai, India. The project combines data from multiple sources including government monitoring stations, satellite imagery, and advanced machine learning models to provide accurate air quality predictions.
                </p>
                <p>
                  Our platform offers real-time air quality predictions for any location in Mumbai, historical data analysis, and personalized health recommendations based on air quality levels. We aim to bridge the gap between complex environmental data and practical, everyday decision-making for Mumbai residents.
                </p>
                <h3 className="text-lg font-semibold mt-4">Technology Stack</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Interactive maps powered by Leaflet</li>
                  <li>Data visualization with Recharts</li>
                  <li>Machine learning models for air quality prediction</li>
                  <li>Real-time data processing and analysis</li>
                  <li>Responsive web design for all devices</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Interactive Map</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Explore air quality across Mumbai with our interactive map
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Real-time Predictions</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Get up-to-date air quality predictions for any location
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Historical Analysis</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Track air quality trends over time with detailed data
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Health Recommendations</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Get personalized advice based on current air quality
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Pollutant Information</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Learn about different pollutants and their health impacts
                      </p>
                    </div>
                  </li>
                </ul>
                
                <Button asChild className="w-full mt-6">
                  <Link to="/map">
                    Try It Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>The science behind our air quality predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold text-2xl">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Data Collection</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We gather data from multiple sources including government monitoring stations, satellite imagery, and weather services.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold text-2xl">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Advanced Algorithms</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Our machine learning models process this data to generate accurate air quality predictions for any location in Mumbai.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold text-2xl">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">User-Friendly Interface</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We present the data in an easy-to-understand format with interactive maps, charts, and personalized recommendations.
                  </p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Our Prediction Methodology</h3>
                <p className="mb-4">
                  AirSenseMumbai employs a hybrid approach combining multiple data sources and advanced machine learning techniques to provide accurate air quality predictions:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Spatial interpolation of existing monitoring station data</li>
                  <li>Integration of meteorological parameters (wind, humidity, temperature)</li>
                  <li>Analysis of traffic patterns and industrial activities</li>
                  <li>Satellite-based aerosol optical depth measurements</li>
                  <li>Temporal patterns and historical trends analysis</li>
                  <li>Machine learning models to combine all factors for accurate predictions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Contact Section */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>Have questions or feedback? Get in touch with our team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  We welcome your questions, feedback, and collaboration opportunities. Our team is dedicated to improving air quality awareness in Mumbai.
                </p>
                <div className="flex items-center mb-3">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  <a href="mailto:contact@airsensemumbai.com" className="text-primary hover:underline">
                    contact@airsensemumbai.com
                  </a>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                  For technical support, partnership inquiries, or data-related questions, please email us and we'll respond within 48 hours.
                </p>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Join Our Efforts</h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  We're always looking for ways to expand our project and improve air quality in Mumbai. Here's how you can contribute:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Share feedback on our predictions and user interface</li>
                  <li>Contribute to our open-source code repositories</li>
                  <li>Spread awareness about air quality issues in Mumbai</li>
                  <li>Partner with us for research or community initiatives</li>
                  <li>Suggest features or improvements for our platform</li>
                </ul>
                <Button className="w-full mt-6">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;
