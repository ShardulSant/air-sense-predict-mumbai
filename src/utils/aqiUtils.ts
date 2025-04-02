
import { AqiCategory, AirQualityData } from '@/types/airQuality';

// Get AQI color based on category
export const getAqiColor = (aqiCategory: AqiCategory): string => {
  switch(aqiCategory) {
    case "Good": return "bg-aqi-good";
    case "Satisfactory": return "bg-aqi-satisfactory";
    case "Moderate": return "bg-aqi-moderate";
    case "Poor": return "bg-aqi-poor";
    case "Very Poor": return "bg-aqi-very-poor";
    case "Severe": return "bg-aqi-severe";
    default: return "bg-aqi-unknown";
  }
};

export const getAqiColorHex = (aqiCategory: AqiCategory): string => {
  switch(aqiCategory) {
    case "Good": return "#4CAF50";
    case "Satisfactory": return "#8BC34A";
    case "Moderate": return "#FFEB3B";
    case "Poor": return "#FF9800";
    case "Very Poor": return "#F44336";
    case "Severe": return "#880E4F";
    default: return "#9E9E9E";
  }
};

export const getAqiTextColor = (aqiCategory: AqiCategory): string => {
  switch(aqiCategory) {
    case "Good": 
    case "Satisfactory": 
    case "Moderate": 
      return "text-black";
    case "Poor": 
    case "Very Poor": 
    case "Severe": 
      return "text-white";
    default: 
      return "text-white";
  }
};

export const getAqiClassName = (aqiCategory: AqiCategory): string => {
  switch(aqiCategory) {
    case "Good": return "aqi-good";
    case "Satisfactory": return "aqi-satisfactory";
    case "Moderate": return "aqi-moderate";
    case "Poor": return "aqi-poor";
    case "Very Poor": return "aqi-very-poor";
    case "Severe": return "aqi-severe";
    default: return "aqi-unknown";
  }
};

// Map categorical values to numeric for visualization
export const getCategoryValue = (category: AqiCategory): number => {
  switch(category) {
    case "Good": return 25;
    case "Satisfactory": return 75;
    case "Moderate": return 125;
    case "Poor": return 175;
    case "Very Poor": return 225;
    case "Severe": return 275;
    default: return 0;
  }
};

// Get recommendations based on AQI category
export const getRecommendations = (aqiCategory: AqiCategory): string => {
  switch(aqiCategory) {
    case "Good":
      return "Air quality is good. Enjoy outdoor activities.";
    case "Satisfactory":
      return "Air quality is satisfactory. May cause minor breathing discomfort to sensitive people.";
    case "Moderate":
      return "Air quality is moderate. May cause breathing discomfort to people with lung disease, children and older adults.";
    case "Poor":
      return "Air quality is poor. May cause breathing discomfort to people on prolonged exposure, and discomfort to people with heart disease.";
    case "Very Poor":
      return "Air quality is very poor. May cause respiratory illness to the people on prolonged exposure. Effect may be more pronounced in people with lung and heart diseases.";
    case "Severe":
      return "Air quality is severe. May cause respiratory impact even on healthy people, and serious health impacts on people with lung/heart disease. The health impacts may be experienced even during light physical activity.";
    default:
      return "No air quality data available.";
  }
};

// Mock API call for predictions
export const fetchAirQuality = async (lat: number, lon: number): Promise<AirQualityData> => {
  // In a real app, this would be an actual API call
  // For now, we'll simulate a response with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate semi-random but realistic values
      const rand = Math.random();
      let aqiCategory: AqiCategory;
      
      if (rand < 0.2) aqiCategory = "Good";
      else if (rand < 0.4) aqiCategory = "Satisfactory";
      else if (rand < 0.6) aqiCategory = "Moderate";
      else if (rand < 0.8) aqiCategory = "Poor";
      else if (rand < 0.95) aqiCategory = "Very Poor";
      else aqiCategory = "Severe";
      
      resolve({
        "PM2.5": Math.floor(Math.random() * 100) + 10,
        "PM10": Math.floor(Math.random() * 150) + 20,
        "NO": Math.floor(Math.random() * 50) + 5,
        "NO2": Math.floor(Math.random() * 80) + 10,
        "SO2": Math.floor(Math.random() * 40) + 5,
        "Ozone": Math.floor(Math.random() * 60) + 10,
        "CO": (Math.random() * 10 + 0.5).toFixed(1),
        "Aqi": aqiCategory
      });
    }, 1000); // Simulate network delay
  });
};

// Generate mock historical data
export const getHistoricalData = () => {
  const categories: AqiCategory[] = ["Good", "Satisfactory", "Moderate", "Poor", "Very Poor", "Severe"];
  
  return [
    { name: 'Mon', aqiCategory: categories[Math.floor(Math.random() * 3)] },
    { name: 'Tue', aqiCategory: categories[Math.floor(Math.random() * 3)] },
    { name: 'Wed', aqiCategory: categories[Math.floor(Math.random() * 4)] },
    { name: 'Thu', aqiCategory: categories[Math.floor(Math.random() * 4)] },
    { name: 'Fri', aqiCategory: categories[Math.floor(Math.random() * 3)] },
    { name: 'Sat', aqiCategory: categories[Math.floor(Math.random() * 2)] },
    { name: 'Sun', aqiCategory: categories[Math.floor(Math.random() * 2)] },
  ];
};

// Get pollutant information
export const getPollutantInfo = (pollutantId: string) => {
  const pollutants = {
    "PM2.5": {
      name: "PM2.5",
      fullName: "Fine Particulate Matter",
      description: "Particles with a diameter of 2.5 micrometers or less. They can penetrate deep into the lungs and even enter the bloodstream.",
      sources: ["Vehicle emissions", "Power plants", "Wood burning", "Industrial processes"],
      healthEffects: ["Respiratory issues", "Heart disease", "Premature death", "Aggravated asthma"],
      threshold: {
        good: 12,
        satisfactory: 35,
        moderate: 55,
        poor: 150,
        veryPoor: 250,
        severe: 350
      },
      unit: "μg/m³"
    },
    "PM10": {
      name: "PM10",
      fullName: "Coarse Particulate Matter",
      description: "Particles with a diameter of 10 micrometers or less. They can enter the lungs and cause respiratory issues.",
      sources: ["Dust", "Construction", "Mining", "Agriculture"],
      healthEffects: ["Respiratory issues", "Irritation of airways", "Coughing", "Decreased lung function"],
      threshold: {
        good: 50,
        satisfactory: 100,
        moderate: 150,
        poor: 350,
        veryPoor: 420,
        severe: 500
      },
      unit: "μg/m³"
    },
    "NO2": {
      name: "NO2",
      fullName: "Nitrogen Dioxide",
      description: "A gas formed by combustion at high temperatures. It contributes to the formation of ground-level ozone and fine particle pollution.",
      sources: ["Vehicle emissions", "Power plants", "Industrial processes"],
      healthEffects: ["Respiratory issues", "Increased asthma attacks", "Bronchitis", "Reduced lung function"],
      threshold: {
        good: 40,
        satisfactory: 80,
        moderate: 180,
        poor: 280,
        veryPoor: 400,
        severe: 520
      },
      unit: "ppb"
    },
    "SO2": {
      name: "SO2",
      fullName: "Sulfur Dioxide",
      description: "A gas formed when fuel containing sulfur, such as coal and oil, is burned. It contributes to acid rain and fine particle pollution.",
      sources: ["Power plants", "Industrial processes", "Burning of coal and oil"],
      healthEffects: ["Respiratory issues", "Breathing difficulties", "Aggravated asthma", "Increased susceptibility to respiratory infections"],
      threshold: {
        good: 40,
        satisfactory: 80,
        moderate: 380,
        poor: 800,
        veryPoor: 1600,
        severe: 2100
      },
      unit: "ppb"
    },
    "Ozone": {
      name: "Ozone",
      fullName: "Ground-level Ozone",
      description: "A gas formed when pollutants emitted by cars, power plants, and other sources react chemically in the presence of sunlight.",
      sources: ["Vehicle emissions", "Industrial emissions", "Chemical solvents", "Gasoline vapors"],
      healthEffects: ["Respiratory issues", "Reduced lung function", "Aggravated asthma", "Inflammation of lung tissue"],
      threshold: {
        good: 50,
        satisfactory: 100,
        moderate: 168,
        poor: 280,
        veryPoor: 400,
        severe: 520
      },
      unit: "ppb"
    },
    "CO": {
      name: "CO",
      fullName: "Carbon Monoxide",
      description: "A colorless, odorless gas formed by incomplete combustion of carbon-containing fuels.",
      sources: ["Vehicle emissions", "Fuel burning", "Industrial processes"],
      healthEffects: ["Reduced oxygen delivery to organs", "Headache", "Dizziness", "Impaired vision"],
      threshold: {
        good: 1,
        satisfactory: 2,
        moderate: 10,
        poor: 17,
        veryPoor: 34,
        severe: 51
      },
      unit: "ppm"
    },
    "NO": {
      name: "NO",
      fullName: "Nitric Oxide",
      description: "A gas formed during combustion, particularly in vehicle engines and power plants.",
      sources: ["Vehicle emissions", "Power plants", "Industrial combustion"],
      healthEffects: ["Respiratory issues", "Contributes to the formation of ozone", "Acid rain"],
      threshold: {
        good: 40,
        satisfactory: 80,
        moderate: 180,
        poor: 280,
        veryPoor: 400,
        severe: 520
      },
      unit: "ppb"
    }
  };
  
  return pollutants[pollutantId] || {
    name: pollutantId,
    fullName: pollutantId,
    description: "No information available",
    sources: ["Unknown"],
    healthEffects: ["Unknown"],
    threshold: {
      good: 0,
      satisfactory: 0,
      moderate: 0,
      poor: 0,
      veryPoor: 0,
      severe: 0
    },
    unit: "unknown"
  };
};
